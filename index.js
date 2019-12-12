const Net = require('net');
const port = 9000;

const server = new Net.createServer();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}.`);
});

    server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
	let offset = 0;
	const readNextBytes = (length) => {
	    	const value = chunk.readIntBE(offset, length);
		offset += length;
		return value;
	} 
        const packet = {
        };
        packet.size = readNextBytes(2);
        packet.imei = readNextBytes(8);
        packet.commandId = readNextBytes(1);
        packet.recordsLeft = readNextBytes(1);
        packet.recordsCount = readNextBytes(1);
	packet.records = [];
	for (let i = 0; i < packet.recordsCount; i++) {
            const record = {};
            record.header = {
		timestamp: new Date(readNextBytes(4)).toISOString(),
		timestampExtension: readNextBytes(1),
		priority: readNextBytes(1),
		longitude: readNextBytes(4) / 10000000,
		latitude: readNextBytes(4) / 10000000,
		altitude: readNextBytes(2),
		angle: readNextBytes(2),
		satellites: readNextBytes(1),
		speed: readNextBytes(2),
		hdop: readNextBytes(1),
		eventId: readNextBytes(1),
	    };
	    console.log(record.header)
            record.body = {};
            record.body.io1ByteCount = readNextBytes(1);
            record.body.io1Bytes = readNextBytes(record.body.io1ByteCount * 2);
            record.body.io2ByteCount = readNextBytes(1);
            record.body.io2Bytes = readNextBytes(record.body.io2ByteCount * 3);
            record.body.io4ByteCount = readNextBytes(1);
            record.body.io4Bytes = readNextBytes(record.body.io4ByteCount * 5);
            record.body.io8ByteCount = readNextBytes(1);
            record.body.io8Bytes = readNextBytes(record.body.io8ByteCount * 9);
            packet.records.push(record);
        }
	
	console.log(packet);
	console.log(packet.records[0].header);
    });

    socket.on('end', function() {
        console.log('Closing connection with the tracker');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
