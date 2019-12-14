const Provider = require('../provider');
const hydrator = require('../hydrator');
const ruptelaParser = require('ruptela');
class SocketController {
    constructor(socket) {
        this.socket = socket;
    }

    async onRecieveData(data) {
        try {
            console.log('hex data : ', data);
            const {data: packet, ack} = ruptelaParser(data);
            console.log(packet.payload);
            const recordsData = hydrator(packet);
            await Provider.bulkInsert(recordsData);
            if (packet.error) {
                console.log(packet.error);
                return;
            }
            console.log('response: ', packet);
            console.log('response: ', packet.payload.records);
            this.socket.write(ack);
        } catch (e) {
            console.log('ERROR: ', e);
        }

    }
}

module.exports = SocketController;