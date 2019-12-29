const mongoose = require('mongoose');
const { Mixed } = mongoose.Schema.Types;

module.exports = mongoose.model('Journey', new mongoose.Schema({
    imei: {
        type: Number,
        index: true,
    },
    imeiString: {
        type: String,
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
        type: String,
        index: true,
    },
    beginAddressCity: {
        type: String,
        index: true,
    },
    beginAddressCountry: {
        type: String,
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
        type: String,
        index: true,
    },
    endAddressCity: {
        type: String,
        index: true,
    },
    endAddressCountry: {
        type: String,
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
