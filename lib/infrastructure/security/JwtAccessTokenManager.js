'use strict';

const jwt = require('jsonwebtoken');
const AccessTokenManager = require('./AccessTokenManager');

const JWT_SECRET_KEY = process.env.SECRET_ENCODER;
module.exports = class extends AccessTokenManager {

  generate(user) {
    return jwt.sign({
      sub: 'my-sub', // needs to match definition above
      value: user.id_utilisateur, // this is a custom key I used, it could be named anything. Value should be a way to authenticate the user
      aud: 'urn:audience:test', // needs to match definition above
      iss: 'urn:issuer:test', // needs to match definition above,
    }, JWT_SECRET_KEY,{ expiresIn: '999y' });
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }

};