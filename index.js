const server = require('net').createServer();
require('./database');
const Controller = require('./controller/index');

server.on('connection', (socket) => {
    const addr = socket.remoteAddress + ':' + socket.remotePort;
    const controller = new Controller(socket);
    console.log('New connection from %s', addr);

    socket.on('data', (data) => controller.onRecieveData(data));

    socket.once('close', () => {
        console.log('Connection from %s closed', addr);
    });
    socket.on('error', (error) => {
        console.log('Error from connection %s: %s', addr, error.message);
    });
});
//configure server to listen on PORT
server.listen(9000, () => {
    console.log('Server started on port %s at %s', server.address().port, server.address().address);
});

