const express = require('express');
const User = require('../models/user');
const tasksRouter = express.Router();


const userId = "6068778a0bc8f6405c0f9304";

tasksRouter.route('/')
// retrieve task list
.get((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.tasks);
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// receives new task object, returns task list
.post((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            // check if task already exists
            const tasks = user.tasks.filter( task => task.id === req.body.id);
            if (tasks.length) {
                err = new Error('Duplicate task');
                err.status = 400;
                return next(err);
            } else {
                user.tasks.push(req.body);
                user.save()
                .then( user => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user.tasks);
                })
                .catch(err => next(err));
            }
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})

// cannot edit multiple tasks
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tasks');
})

// receives array of task ids, deletes tasks
.delete((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if (user) {
            // check that tasks exist
            const deletedTasks = user.tasks.filter( task => req.body.includes(task.id));
            if (!deletedTasks.length) {
                err = new Error('No tasks to delete');
                err.status = 400;
                return next(err);
            }
            // retrieve and remove each task by object id
            deletedTasks.forEach(task => {
                user.tasks.id(task._id).remove();
            });
            user.save()
            .then( user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user.tasks);
            })
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});


tasksRouter.route('/:taskId')
// return task based on param
.get((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            // retrieve task by id
            const task = user.tasks.filter( task => task.id === req.params.taskId)[0];
            if (task) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(task);
            } else {
                err = new Error('Task not found');
                err.status = 404;
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
// cannot add to single task
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /tasks/${req.params.taskId}`);
})
// receive object with task id and updates, return task list
.put((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if(user) {
            // retrieve task by id
            const task = user.tasks.filter( task => task.id === req.params.taskId)[0];
            if (task) {
                // dynamically update properties contained in req.body
                for (let property in req.body) {
                    user.tasks.id(task._id)[property] = req.body[property];
                } 
                user.save()
                .then( user => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user.tasks);
                });
            } else {
                err = new Error('Task not found');
                err.status = 404;
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
// receive task id, delete task, return list
.delete((req, res, next) => {
    User.findById(userId)
    .then( user => {
        if (user) {
            // retrieve task by id and remove
            const task = user.tasks.filter( task => task.id === req.params.taskId)[0];
            if (task) {
                user.tasks.id(task._id).remove();
                user.save()
                .then( user => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user.tasks);
                });
            } else {
                err = new Error('Task not found');
                err.status = 404;
                return next(err);
            }
        } else {
            err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});



module.exports = tasksRouter;