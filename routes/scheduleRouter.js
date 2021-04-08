const express = require('express');
const User = require('../models/user');
const scheduleRouter = express.Router();

const userId = "606edc1d7b52e13e1c72819e";

scheduleRouter.route('/')
// retrieve schedule 
.get((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.schedule);
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// receives new schedule object, returns updated schedule
.put((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            // check that date is included and valid
            const isDate = (val) => /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(val);
            if (req.body.forDate && isDate(req.body.forDate)) {
                // if stored schedule is for different date, reset all fields
                if (req.body.forDate !== user.schedule.forDate) {
                    user.schedule.schedule = [];
                    user.schedule.notToday = [];
                    user.schedule.queued = [];
                }
                // dynamically update properties included in request
                for (let property in req.body) {
                    user.schedule[property] = req.body[property];
                }
                user.save()
                .then( user => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user.schedule);
                })
                .catch(err => next(err));
            } else {
                err = new Error('Schedule must include a valid date');
                err.status = 400;
                return next(err);  
            }
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// cannot add new schedule
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /schedule');
})

// cannot delete schedule
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /schedule');
});

module.exports = scheduleRouter;