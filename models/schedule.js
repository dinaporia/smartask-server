const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    forDate: {
        type: Date,
        required: true
    },
    schedule: {
        type: Array,
        required: true
    },
    notToday: {
        type: Array,
        default: []
    },
    queued: {
        type: Array,
        default: []
    }
});

module.exports = scheduleSchema;