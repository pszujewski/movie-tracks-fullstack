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

router.put('/', jsonParser, (req, res) => {
  // get user id and use to update user's info from db
  const {id, title} = req.body;
  const newFavorite = {title};
  return User.findByIdAndUpdate(
    id, 
    {$push: {favorites: newFavorite}},
    {safe: true, upsert: true, new: true})
    .exec()
    .then(result => {
      const userDoc = result.apiRepr(); 
      return res.status(201).json(userDoc); 
    })
    .catch(error => {
      console.error(error);
    });
});

router.delete('/', jsonParser, (req, res) => {
  const {userId} = req.body;
  const {movieId} = req.body;
  return User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: { _id: movieId } } },
    {safe: true}
  )
  .exec()
  .then(isDone => {
    return User
      .findById(userId).exec();
  })
  .then(userDoc => {
    const user = userDoc.apiRepr();
    return res.status(200).json(user);
  })
  .catch(error => {
    console.error(error);
    return res.status(500).json({messsage: 'error'});
  });
});

module.exports = {favoritesRouter: router};