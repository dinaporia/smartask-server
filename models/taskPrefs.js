const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskPrefSchema = new Schema({
    category: {
        type: String,
        default: 'Other'
    },
    priority: {
        type: Number,
        default: 2,
        min: 1,
        max: 3
    },
    difficulty: {
        type: Number,
        default: 2,
        min: 1,
        max: 4
    },
    interest: {
        type: Number,
        default: 2,
        min: 1,
        max: 3
    },
    duration: {
        type: Number,
        default: 30,
        min: 15, 
        max: 180
    }
}, 
{ timestamps: true }
);

module.exports = taskPrefSchema;