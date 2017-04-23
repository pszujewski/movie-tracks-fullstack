// Configure environment variables
require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const {DATABASE_URL} = require('./config');

const app = express();

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// Require the routers
const {signUpRouter} = require('./routers/signUpRouter');
const {logInRouter} = require('./routers/logInRouter');
const {favoritesRouter} = require('./routers/favoritesRouter');

// API endpoints go here!
app.use('/signup', signUpRouter);
app.use('/login', logInRouter);
app.use('/favorites', favoritesRouter);

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your server is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
    });
  })
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
