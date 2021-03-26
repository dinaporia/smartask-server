const express = require('express');
const User = require('../models/user');

const router = express.Router();

// GET (retrieve task list),
// POST (add new task),
// DELETE (delete selected tasks)
// /tasks/:taskId GET (retrieve individual task),
// PUT (edit task),
// DELETE (delete task)

router.get('/', (req, res, next) => {
    User.findById("605de3c705cb145f894dc7f3")
    .then((user) => {
        if (user) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.tasks);
        }
    })
    .catch(err => next(err));
});



module.exports = router;