const Provider = require('../provider');
const hydrator = require('../hydrator');
const ruptelaParser = require('ruptela');
class Controller {
    constructor(socket) {
        this.socket = socket;
    }

    async onRecieveData(data) {
        try {
            console.log('hex data : ', data);
            const {data: res} = ruptelaParser(data);
            const recordsData = hydrator(res);
            await Provider.bulkInsert(recordsData);
            if (res.error) {
                console.log(res.error);
                return;
            }
            console.log('response: ', res);
            console.log('response: ', res.payload.records);
            socket.write(res.ack);
        } catch (e) {
            console.log('ERROR: ', e);
        }

    }
}

module.exports = Controller;
