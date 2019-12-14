module.exports = (packet) => packet.payload.records.map(record => ({
    imei: parseInt(packet.imei),
    ...record,
    timestamp: new Date(record.timestamp),
    latitude: record.latitude / 10000000,
    longitude: record.longitude / 10000000,
    angle: record.angle / 100,
}));
