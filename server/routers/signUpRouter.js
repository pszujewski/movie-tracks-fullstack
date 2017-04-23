// sign up router
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonParser = bodyParser.json();

const { User } = require('../models');

const router = express.Router();

router.use(morgan('common'));

router.post('/', jsonParser, (req, res) => {
    console.log(req.body);
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    for (let i=0; i<requiredFields.length; i++) {
        let field = requiredFields[i];
        let isValidStr = req.body.field !== " " && req.body.field !== "";
        if (!req.body.hasOwnProperty(field) || !isValidStr) {
            let message = "All input fields are required";
            console.error(message);
            return res.status(400).json({message: message});
        }
    }
    // check validity of email and password
    const {password, email} = req.body;
    const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidPW = password.length > 5 && password.length < 30;
    const isValidEmail = regExpEmail.test(email);
    if (!isValidPW || !isValidEmail) {
        let message = "Please enter a valid email and password";
        console.error(message);
        return res.status(400).json({message: message});
    }
    // Does the user already exist?
    return User
    .count({email: req.body.email}).exec()
    .then(count => {
        if (count > 0) {
          let message = `User ${req.body.email} already exists`;
          console.error(message);
          return res.status(404).json({message: message});
        }
        return User.hashPassword(req.body.password);
    })
    .then(hash => {
      // use user model from mongoose to create a new user document in mongo database 
      return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        favorites: []
      });
    })
    .then(newUser => {
      // send email with nodemailer --> to do
      // send response good status and json representation of new user
      return res.status(201).json(newUser.apiRepr());
    })
    .catch(err => {
      console.error(err);
    });
});

//for convenience of looking at current database
router.get('/users', (req, res) => {
  User.find({}).exec()
  .then(users => {
    res.json(users);
  });
});

module.exports = {signUpRouter: router};