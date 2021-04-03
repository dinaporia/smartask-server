const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    forDate: {
        type: String,
    },
    schedule: {
        type: Array,
        default: []
    },
    notToday: {
        type: Array,
        default: []
    },
    queued: {
        type: Array,
        default: []
    }
},
{ timestamps: true }
);

module.exports = scheduleSchema;