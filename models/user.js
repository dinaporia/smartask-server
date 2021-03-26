const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportlocalMongoose = require('passport-local-mongoose');

const taskSchema = require('./task');
const schedPrefSchema = require('./schedPrefs');
const scheduleSchema = require('./schedule');
const taskPrefSchema = require('./taskPrefs');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    }, 
    tasks: [taskSchema],
    schedule: scheduleSchema,
    schedPref: schedPrefSchema, 
    taskPref: taskPrefSchema,
    // optional
    facebookId: String
}, 
{ timestamps: true }
);

userSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('User', userSchema);