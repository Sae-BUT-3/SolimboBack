'use strict';

const constants = require('./constants');
const environment = require('./environment');
const UserRepository= require('../repositories/UserRepository');
const spotifyRepository= require('../repositories/SpotifyRepository');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const documentRepository= require('../repositories/DocumentRepository');
const NodemailerRepository= require('../repositories/NodemailerRepository');
const FollowRepository= require('../repositories/FollowRepository');

function buildBeans() {
  return {
    accessTokenManager: new JwtAccessTokenManager(),
    userRepository: new UserRepository(),
    spotifyRepository:  new spotifyRepository(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.SPOTIFY_AUTH_REDIRECT),
    documentRepository: new documentRepository(),
    mailRepository:  new NodemailerRepository(process.env.MAILER_SERVICE,process.env.MAILER_EMAIL,process.env.MAILER_PASS),
    followRepository: new FollowRepository()
  };
}

module.exports = buildBeans();
