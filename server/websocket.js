const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5050 });
console.log('Websocket listening on port 5050 ...')
let connections = 0;
wss.on('connection', (ws) => {
    connections++;
    console.log('New connection ! (', connections, ' clients)');
    ws.on('close', () => {
        connections--;
        console.log('Connection closed ! (', connections, ' clients)')
    });
});

module.exports = wss;


