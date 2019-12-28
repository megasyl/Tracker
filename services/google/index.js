const axios = require('axios');

class Google {
    static url = 'https://maps.googleapis.com/maps/api/';
    static async getAddressFromLocation(location) {
        try {
            const response = await axios.get(`${Google.url}geocode/json?latlng=${location[0]},${location[1]}&key=AIzaSyCxuVAmsmw5_r1iscWKdJMP1T7CHMG77Ow`);
            return response;
        } catch (e) {
            console.log("error", e)
        }
    }
}

module.exports = Google;
