const mongoose = require('mongoose');
const { Mixed } = mongoose.Schema.Types;

module.exports = mongoose.model('Record', new mongoose.Schema({
    imei: {
        type: Number,
        index: true,
    },
    timestamp: {
        type: Date,
        index: true,
    },
    timestamp_extension: Number,
    priority: Boolean,
    longitude: Number,
    latitude: Number,
    altitude: Number,
    angle: Number,
    satellites: Number,
    speed: Number,
    hdop: Number,
    event_id: Number,
    io: [Mixed],
}));
