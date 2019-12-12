const Net = require('net');
const port = 8080;

const server = new Net.createServer();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}.`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        console.log(`Data received from tracker: ${chunk.toString()}.`);
    });

    socket.on('end', function() {
        console.log('Closing connection with the tracker');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
