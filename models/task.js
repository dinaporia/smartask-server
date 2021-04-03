const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// all values handled on front end, required in db

const taskSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true,
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
    },
    { timestamps: true }
);

module.exports = taskSchema;