'use strict';

const constants = require('./constants');
const environment = require('./environment');
const UserRepository= require('../repositories/UserRepository');
const spotifyRepository= require('../repositories/SpotifyRepository');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');

function buildBeans() {
  return {
    accessTokenManager: new JwtAccessTokenManager(),
    userRepository: new UserRepository(),
    spotifyRepository:  new spotifyRepository(process.env.CLIENT_ID,process.env.CLIENT_SECRET),
  };
}

module.exports = buildBeans();
