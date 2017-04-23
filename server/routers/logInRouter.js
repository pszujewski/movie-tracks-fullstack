// login router
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonParser = bodyParser.json();
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const cookieParser = require('cookie-parser');

const { User } = require('../models');

const router = express.Router();

router.use(cookieParser());
router.use(morgan('common'));

const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User.findOne({email: username}).exec()
  .then(_user => {
    user = _user;
    if (!user) {
      return callback(null, false, {message: `User ${username} does not exist` });
    }
    return _user.validatePassword(password);
  })
  .then(isValid => {
    if (!isValid) {
      return callback(null, false, {message: `Incorrect password for user ${username}`});
    }
    return callback(null, user.apiRepr());
  })
  .catch(err => {
    console.error(err);
  });
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.get('/', jsonParser, passport.authenticate('basic', {session: false}), (req, res) => {
  // Send authenticated user data
  const {id} = req.user;
  return res.cookie('sessionId', id).status(200).json(req.user);
});

module.exports = { logInRouter: router };