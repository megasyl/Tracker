module.exports = (packet) => packet.payload.records.map(record => ({
    imei: packet.imei,
    ...record
}));
