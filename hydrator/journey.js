const GoogleService = require('../services/google');
const { getDistance } = require('geolib');

const findByType = (components, type) => components
    .find(component => component.types.includes(type))['long_name'];

module.exports = async (journey, record) => {
    journey.records.push(record);
    journey.completed = true;
    journey.endTimestamp = record.timestamp;
    const { snappedPoints } = await GoogleService
        .snapPointsToClosestRoads(journey.records.map(record => [record.latitude, record.longitude]));
    journey.snappedPoints = snappedPoints.filter(point => point.originalIndex);
    journey.interpolatedPoints = snappedPoints;
    const [beginAddress, endAddress] = await Promise.all([
        GoogleService.getAddressFromLocation([journey.records[0].latitude, journey.records[0].longitude]),
        GoogleService.getAddressFromLocation([record.latitude, record.longitude])
    ]);
    if (beginAddress) {
        const components = beginAddress.results[0]['address_components'];
        journey.beginAddress = beginAddress.results[0]['formatted_address'];
        journey.beginCountry = findByType(components, 'country');
        journey.beginAddressRoad = findByType(components, 'route');
        journey.beginAddressZip = findByType(components, 'postal_code');
        journey.beginAddressCity = findByType(components, 'locality');
    }
    if (endAddress) {
        const components = endAddress.results[0]['address_components'];
        journey.endAddress = endAddress.results[0]['formatted_address'];
        journey.endCountry = findByType(components, 'country');
        journey.endAddressRoad = findByType(components, 'route');
        journey.endAddressZip = findByType(components, 'postal_code');
        journey.endAddressCity = findByType(components, 'locality');
    }

    journey.distance = 0;
    for (let i in journey.snappedPoints) {
        const current = journey.snappedPoints[i];
        const next = journey.snappedPoints[i+1];
        if (next) {
            journey.distance += getDistance(current.location, next.location);
        }
    }
    journey.maxSpeed = Math.max(...journey.records.map(record => record.speed));
    journey.averageSpeed = journey.records.map(record => record.speed).reduce((acc, cur) => acc + cur, 0) / journey.records.length;
    console.log('journey had records, closing it');
    return journey;
};
