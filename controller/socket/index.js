const ruptelaParser = require('ruptela');

class SocketController {
    constructor(socket) {
        this.socket = socket;
    }

    async onRecieveData(data) {
        try {
            const {data: packet, ack} = ruptelaParser(data);
            // Removed logic, just to make sure trackers won't block on our socket
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
