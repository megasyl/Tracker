const WebSocket = require('ws');

const broadcast = (wss, payload) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });

};
module.exports = {
    broadcast
};
