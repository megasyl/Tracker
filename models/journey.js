const mongoose = require('mongoose');
const { Mixed } = mongoose.Schema.Types;

module.exports = mongoose.model('Journey', new mongoose.Schema({
    imei: {
        type: Number,
        index: true,
    },
    completed: {
        type: Boolean,
    },
    beginAddress: {
        type: String,
    },
    beginAddressRoad: {
        type: String,
        index: true,
    },
    beginAddressZip: {
        type: Number,
        index: true,
    },
    beginAddressCity: {
        type: Number,
        index: true,
    },
    beginAddressCountry: {
        type: Number,
        index: true,
    },
    endAddress: {
        type: String,
    },
    endAddressRoad: {
        type: String,
        index: true,
    },
    endAddressZip: {
        type: Number,
        index: true,
    },
    endAddressCity: {
        type: Number,
        index: true,
    },
    endAddressCountry: {
        type: Number,
        index: true,
    },
    beginTimestamp: {
        type: Date,
        index: true,
    },
    endTimestamp: {
        type: Date,
        index: true,
    },
    distance: {
        type: Number
    },
    maxSpeed: {
        type: Number
    },
    averageSpeed: {
        type: Number
    },
    records: [Mixed],
    snappedPoints: [Mixed],
    interpolatedPoints: [Mixed],
}));
