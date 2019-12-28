const axios = require('axios');

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
            const path = points.join('|');
            const url = 'https://roads.googleapis.com/v1/snapToRoads';
            const {data} = await axios.get(`${url}?path=${path}&interpolate=true&key=AIzaSyCxuVAmsmw5_r1iscWKdJMP1T7CHMG77Ow`);
            return data;
        } catch (e) {
            console.log("error", e)
        }
    }
}

module.exports = Google;
