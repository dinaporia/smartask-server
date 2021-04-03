const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');
const tasksRouter = express.Router();

const userId = "605de3c705cb145f894dc7f3";

tasksRouter.route('/')
// retrieve task list
.get((req, res, next) => {
    User.findById(userId)
    .then((user) => {
        if (user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.tasks);
        } else {
            err = new Error('User not found');
            err.status = 404;
        }
    })
    .catch(err => next(err));
})
// add a new task
.post((req, res, next) => {
    User.findById(userId)
    .then((user) => {
        user.tasks.push(req.body);
        user.save()
        .then( user => { 
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.tasks);
        })
    })
    .catch(err => next(err));

})
// cannot edit multiple tasks
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tasks');
})
// delete selected tasks
.delete((req, res, next) => {

});

tasksRouter.route('/:taskId')
// retrieve single task
.get((req, res, next) => {

})
// cannot add to single task
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /tasks/${taskId}`);
})
// edit task
.put((req, res, next) => {

})
// delete task
.delete((req, res, next) => {

});



module.exports = tasksRouter;