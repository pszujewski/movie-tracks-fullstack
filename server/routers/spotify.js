const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');
//const morgan = require('morgan');
const jsonParser = bodyParser.json();

const router = express.Router();

// Helper functions 
function retrieveAccessToken() {
  return spotifyApi.clientCredentialsGrant()
    .then(credentials => {
      // Save the access token on the API object so that it's used in future calls
      spotifyApi.setAccessToken(credentials.body['access_token']);
      return credentials;
    }, function(err) {
          console.log('Something went wrong when retrieving an access token', err);
    });
}

const spotifyApi = new SpotifyWebApi({
  clientId : process.env.spotify_client_id,
  clientSecret : process.env.spotify_client_secret
});

// Router Endpoints
router.get('/access-token', (req, res) => {
  // Retrieve an access token.
  return retrieveAccessToken()
    .then(accessData => {
      console.log(accessData.body.access_token);
      return res.status(200).json(accessData);
    })
    .catch(err => console.log(err));
});

module.exports = {spotify: router};

