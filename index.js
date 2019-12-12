const Net = require('net');
const crc16 = require('crc16');
const port = 9000;

const server = new Net.createServer();

server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}.`);
});

    server.on('connection', function(socket) {
    console.log('A new connection has been established.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
	console.log(chunk.toString('hex'))
	let offset = 0;
	const readNextBytes = (length) => {
	    	const value = chunk.readIntBE(offset, length);
		offset += length;
		return value;
	};
	const readRecordBody = (bodySize, count) => {
		const array = [];
            for (let i = 0; i < count; i++) {
                array.push({id: readNextBytes(1), value: readNextBytes(bodySize)})
            }
	    return array;
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
		timestamp: new Date(readNextBytes(4) * 1000).toISOString(),
		timestampExtension: readNextBytes(1),
		priority: readNextBytes(1),
		longitude: readNextBytes(4) / 10000000,
		latitude: readNextBytes(4) / 10000000,
		altitude: readNextBytes(2),
		angle: readNextBytes(2) / 100,
		satellites: readNextBytes(1),
		speed: readNextBytes(2),
		hdop: readNextBytes(1),
		eventId: readNextBytes(1),
	    };
	    console.log(record.header)
            record.body = {};
            record.body.io1ByteCount = readNextBytes(1);
	    record.body.io1Bytes = readRecordBody(1, record.body.io1ByteCount);
            //record.body.io1Bytes = readNextBytes(record.body.io1ByteCount * 2);
            record.body.io2ByteCount = readNextBytes(1);
            record.body.io2Bytes = readRecordBody(2, record.body.io2ByteCount);
            record.body.io4ByteCount = readNextBytes(1);
            record.body.io4Bytes = readRecordBody(4, record.body.io4ByteCount);
            record.body.io8ByteCount = readNextBytes(1);
            record.body.io8Bytes = readRecordBody(8, record.body.io8ByteCount);
	    console.log(record.body);
            packet.records.push(record);
        }
	console.log('==========')	
    });

    socket.on('end', function() {
        console.log('Closing connection with the tracker');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
