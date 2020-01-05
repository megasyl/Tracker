const GoogleService = require('../services');
const { getDistance } = require('geolib');

const extractComponent = (components, type) => {
    const component = components.find(component => component.types.includes(type));
    return component ? component['long_name'] : null;
};

module.exports = async (journey, record) => {
    journey.records.push(record);
    journey.completed = true;
    journey.endTimestamp = record.timestamp;
    const { snappedPoints } = await GoogleService
        .snapPointsToClosestRoads(journey.records.map(record => [record.latitude, record.longitude]));
    journey.snappedPoints = snappedPoints;
    if (snappedPoints.length < 2) return null;
    journey.distance = 0;
    for (let i in journey.snappedPoints) {
        const current = journey.snappedPoints[i];
        const next = journey.snappedPoints[i+1];
        if (next) {
            journey.distance += getDistance(current.location, next.location);
        }
    }
    if (journey.distance < 0.1) return null;
    journey.interpolatedPoints = await GoogleService.findPlausibleRouteFromLocations(snappedPoints.map(point => [point.location.latitude, point.location.longitude]));

    const [beginAddress, endAddress] = await Promise.all([
        GoogleService.getAddressFromLocation([journey.records[0].latitude, journey.records[0].longitude]),
        GoogleService.getAddressFromLocation([record.latitude, record.longitude])
    ]);

    if (beginAddress) {
        const components = beginAddress.results[0]['address_components'];
        journey.beginAddress = beginAddress.results[0]['formatted_address'];
        journey.beginCountry = extractComponent(components, 'country');
        journey.beginAddressRoad = extractComponent(components, 'route');
        journey.beginAddressZip = extractComponent(components, 'postal_code');
        journey.beginAddressCity = extractComponent(components, 'locality');
    }
    if (endAddress) {
        const components = endAddress.results[0]['address_components'];
        journey.endAddress = endAddress.results[0]['formatted_address'];
        journey.endCountry = extractComponent(components, 'country');
        journey.endAddressRoad = extractComponent(components, 'route');
        journey.endAddressZip = extractComponent(components, 'postal_code');
        journey.endAddressCity = extractComponent(components, 'locality');
    }

    journey.maxSpeed = Math.max(...journey.records.map(record => record.speed));
    journey.averageSpeed = journey.records.map(record => record.speed).reduce((acc, cur) => acc + cur, 0) / journey.records.length;
    return journey;
};
