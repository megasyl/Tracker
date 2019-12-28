const axios = require('axios');
const arrayChunk = require('../../utils/arrayChunk');
class Google {
    static async getAddressFromLocation(location) {
        try {
            const url = 'https://maps.googleapis.com/maps/api/geocode';
            const {data} = await axios.get(`${url}/json?latlng=${location[0]},${location[1]}&key=AIzaSyCxuVAmsmw5_r1iscWKdJMP1T7CHMG77Ow`);
            return data;
        } catch (e) {
            console.log("error", e)
        }
    }

    static async snapPointsToClosestRoads(points) {
        try {
            const url = 'https://roads.googleapis.com/v1/snapToRoads';
            if (points.length > 100) {
                const promises = arrayChunk(points).map(chunk => {
                    const path = chunk.join('|');
                    return axios.get(`${url}?path=${path}&interpolate=true&key=AIzaSyCxuVAmsmw5_r1iscWKdJMP1T7CHMG77Ow`);
                })
                const responses = await Promise.all(promises);
                return responses.reduce((acc, cur, i) => {
                    cur.data.snappedPoints.forEach(point => acc.snappedPoints.push(point));
                }, { snappedPoints: []});

            }
            const path = points.join('|');

            const {data} = await axios.get(`${url}?path=${path}&interpolate=true&key=AIzaSyCxuVAmsmw5_r1iscWKdJMP1T7CHMG77Ow`);
            return data;
        } catch (e) {
            console.log("error", e)
        }
    }
}

module.exports = Google;
