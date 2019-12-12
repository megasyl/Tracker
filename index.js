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
        console.log(`Size : ${chunk.readIntBE(0, 2)}`);
        console.log(`IMEI : ${chunk.readIntBE(2, 8)}`);
        console.log(`CommandId : ${chunk.readIntBE(10, 1)}`);
        console.log(`Records left : ${chunk.readIntBE(11, 1)}`);
        const count = chunk.readIntBE(12, 1);
        console.log(`Records count : ${count}`);
        /*for (let i = 0; i < count; i++) {
            ${chunk.readIntBE(13, 8)}
        }*/
        //console.log(`Records count : ${chunk.readIntBE(2, 8)}`);

    });

    socket.on('end', function() {
        console.log('Closing connection with the tracker');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
