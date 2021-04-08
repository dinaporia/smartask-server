const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportlocalMongoose = require('passport-local-mongoose');

const taskSchema = require('./task');
const schedPrefSchema = require('./schedPrefs');
const scheduleSchema = require('./schedule');
const taskPrefSchema = require('./taskPrefs');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    tasks: [{
        type: taskSchema, 
        default: () => ({})     // ensure that default values will be used to populate if empty
    }],
    schedule: {
        type: scheduleSchema,
        default: () => ({})
    },
    schedPrefs: {
        type: schedPrefSchema,
        default: () => ({})
    },
    taskPrefs: {
        type: taskPrefSchema,
        default: () => ({})
    }
}, 
{ timestamps: true }
);

//userSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('User', userSchema);