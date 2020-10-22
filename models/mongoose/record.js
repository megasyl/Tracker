const mongoose = require('mongoose');

module.exports = mongoose.model('Record', new mongoose.Schema({
    imei: {
        type: Number,
        index: true,
    },
    voltage: Number,
    ibutton_code: Number,
    timestamp: {
        type: Date,
        index: true,
    },
    channel_id: Number,
    din: {
        type: Number,
        index: true
    },
    longitude: Number,
    latitude: Number,
    altitude: Number,
    angle: Number,
    satellites: Number,
    speed: Number,
    hdop: Number,
    event_id: {
        type: Number,
        index: true
    },
    acceleration_events: Number,
    cornering_events: Number,
    extreme_braking_events: Number,
    harsh_braking_events: Number,
}));
