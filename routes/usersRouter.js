var express = require('express');
const User = require('../models/user');
// const passport = require('passport');
// const authenticate = require('../authenticate');

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req, res, next) {
  User.find()
    .then(users => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    })
    .catch(err => next(err));
});

/* register new user */
usersRouter.post('/signup', (req, res, next) => {
  // check if user already exists
  User.findOne({username: req.body.username})
  .then( user => {
    if (user) {
      const err = new Error(`User ${req.body.username} already exists.`);
      err.status = 403;
      return next(err);
    } else {
    // create new user 
      User.create(req.body)
      .then (user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applicatoin/json');
        res.json({status: 'New user added', user: user});   
      })
      .catch(err => next(err));
    }
  })
  .catch(err => next(err));

});

module.exports = usersRouter;
