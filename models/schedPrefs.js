const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedPrefSchema = new Schema({
    hours: {
        type: Number,
        default: 320,
        min: 60,
        max: 480
    },
    maxHard: {
        type: Number,
        default: 1,
        min: 1,
        max: 10
    },
    maxTedious: {
        type: Number,
        default: 1,
        min: 1,
        max: 10
    },
    includeFun: {
        type: Boolean,
        default: true
    }
}, 
{ timestamps: true }
);

module.exports = schedPrefSchema;
