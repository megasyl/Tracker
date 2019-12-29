const RecordProvider = require('../provider/record');
const hydrator = require('../hydrator');
const ruptelaParser = require('ruptela');
const websocketServer = require('../server/websocket');
const { broadcast } = require('../utils/websocket');
class SocketController {
    constructor(socket) {
        this.socket = socket;
    }

    async onRecieveData(data) {
        try {
            const {data: packet, ack} = ruptelaParser(data);
            const recordsData = hydrator(packet);
            await RecordProvider.bulkInsert(recordsData);
            broadcast(websocketServer, recordsData[recordsData.length - 1]);
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
