const mongoose = require('mongoose');
const { Mixed } = mongoose.Schema.Types;

module.exports = mongoose.model('Journey', new mongoose.Schema({
    imei: {
        type: Number,
        index: true,
    },
    completeted: {
        type: Boolean,
    },
    beginTimestamp: {
        type: Date,
        index: true,
    },
    endTimestamp: {
        type: Date,
        index: true,
    },
    records: [Mixed],
}));
