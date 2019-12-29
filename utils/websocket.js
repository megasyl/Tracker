const WebSocket = require('ws');
var JSONbig = require('json-bigint');

const broadcast = (wss, payload) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSONbig.stringify(payload));
        }
    });

};
module.exports = {
    broadcast
};
