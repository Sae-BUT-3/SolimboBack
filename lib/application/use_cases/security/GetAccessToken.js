'use strict';
const throwStatusCode = require("../utils/throwStatusCode")
const bcrypt = require("bcrypt");
module.exports = async (email, password, { userRepository, accessTokenManager }) => {
  const user = await userRepository.getByIdent(email);
  if (!user || !await bcrypt.compare(password,user.password)) {
    throwStatusCode(401,'Bad credentials')
  }

  return accessTokenManager.generate({
    sub: 'my-sub', // needs to match definition above
    value: user.id_utilisateur, // this is a custom key I used, it could be named anything. Value should be a way to authenticate the user
    aud: 'urn:audience:test', // needs to match definition above
    iss: 'urn:issuer:test' // needs to match definition above
  });
};
