const express = require('express');
const User = require('../models/user');
const tasksRouter = express.Router();
const Task = require('../models/task');

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
            // check if task has already been added
            const tasks = user.tasks.filter( task => task.id === req.body.id);
            if (tasks.length) {
                err = new Error('Task id already exists');
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
            // error handling for when some but not all tasks to delete are valid?
            const deletedTasks = user.tasks.filter( task => req.body.includes(task.id));
            if (!deletedTasks.length) {
                err = new Error('No tasks to delete');
                err.status = 400;
                return next(err);
            }
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