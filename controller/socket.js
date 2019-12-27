const Provider = require('../provider');
const hydrator = require('../hydrator');
const ruptelaParser = require('ruptela');
class SocketController {
    constructor(socket) {
        this.socket = socket;
    }

    async onRecieveData(data) {
        try {
            const {data: packet, ack} = ruptelaParser(data);
            const recordsData = hydrator(packet);
            await Provider.bulkInsert(recordsData);
            if (packet.error) {
                console.log(packet.error);
                return;
            }
            this.socket.write(ack);
        } catch (e) {
            console.log('ERROR: ', e);
        }

    }
}

module.exports = SocketController;
