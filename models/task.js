const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    interest: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    duration: {
        type: Number,
        required: true,
        min: 15, 
        max: 180
    },
    recurring: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = taskSchema;