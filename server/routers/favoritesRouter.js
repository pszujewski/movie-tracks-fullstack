const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jsonParser = bodyParser.json();
const { User } = require('../models');
const cookieParser = require('cookie-parser'); 

const router = express.Router();
router.use(cookieParser());

// for looking at a single document. Does not require validation or authorization
router.get('/:id', (req, res) => {
  const {id} = req.params;
  return User.findById(id)
    .exec()
    .then(document => {
      return res.status(200).json(document.apiRepr());
    })
    .catch(error => { 
      console.error(error);
      return res.status(500).json({message: "Error"}); 
    });
});

router.post('/', jsonParser, (req, res) => {
  // get user id and use to update user's info from db
  const {sessionId} = req.cookies;
  const {id, title, poster} = req.body;
  const newFavorite = {title, poster};
  return User.findByIdAndUpdate(
    sessionId, 
    {$push: {'favorites': newFavorite}},
    {safe: true, upsert: true, new: true})
    .exec()
    .then(result => { 
      console.log(result);
      return res.status(202).send(result); 
    })
    .catch(error => {
      console.error(error);
    });
})


module.exports = {favoritesRouter: router};