module.exports = (packet) => packet.records.map(record => ({
    imei: packet.imei,
    ...record
}));
