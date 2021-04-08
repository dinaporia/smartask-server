
/*
/prefs GET (retrieve all preferences)
/prefs/sched PUT (update schedule prefs)
/prefs/task PUT (update task prefs)

*/
const express = require('express');
const User = require('../models/user');
const prefsRouter = express.Router();


const userId = "606edc1d7b52e13e1c72819e";

prefsRouter.route('/');
prefsRouter.route('/sched')
// retrieve schedule preferences
.get((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.schedPrefs);
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// receives new prefs object, returns updated prefs
.put((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            for (let property in req.body) {
                user.schedPrefs[property] = req.body[property];
            }
            user.save()
            .then( user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user.schedPrefs);
            })
            .catch(err => next(err));
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// cannot add new prefs
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /prefs/sched');
})

// cannot delete prefs
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /prefs/sched');
});

prefsRouter.route('/task')
// retrieve task preferences
.get((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.taskPrefs);
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// receives new prefs object, returns updated prefs
.put((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            for (let property in req.body) {
                user.taskPrefs[property] = req.body[property];
            }
            user.save()
            .then( user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user.taskPrefs);
            })
            .catch(err => next(err));
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// cannot add new prefs
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /prefs/task');
})

// cannot delete prefs
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /prefs/task');
});

module.exports = prefsRouter;