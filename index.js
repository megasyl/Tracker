const Net = require('net');
const crc = require('crc');
const port = 9000;

const server = new Net.createServer();

server.listen(port, function () {
    console.log(`Server listening for connection requests on socket localhost:${port}.`);
});

server.on('connection', function (socket) {
    console.log('A new connection has been established.');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
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
        };

        const packet = {
            size: readNextBytes(2),
            imei: readNextBytes(8),
            commandId: readNextBytes(1),
            recordsLeft: readNextBytes(1),
            recordsCount: readNextBytes(1),
            records: [],
        };

        packet.records = [...Array(packet.recordsCount).keys()].map(() => ({
            header: {
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
            },
            body: {
                io1Bytes: readRecordBody(1, readNextBytes(1)),
                io2Bytes: readRecordBody(2, readNextBytes(1)),
                io4Bytes: readRecordBody(4, readNextBytes(1)),
                io8Bytes: readRecordBody(8, readNextBytes(1)),
            }
        }));

        console.log('==========')
        const response = Buffer.allocUnsafe(6);
        response.writeIntBE(2, 0, 2);
        response.writeIntBE(100, 2, 1);
        response.writeIntBE(1, 3, 1);
        response.writeIntBE(crc.crc16kermit(chunk), 3, 2);
        socket.write(response, () => {
            console.log('response sent : ', response);
        })

    });

    socket.on('end', function () {
        console.log('Closing connection with the tracker');
    });

    socket.on('error', function (err) {
        console.log(`Error: ${err}`);
    });
});
