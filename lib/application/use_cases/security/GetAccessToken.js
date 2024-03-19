'use strict';
const throwStatusCode = require("../utils/throwStatusCode")
const bcrypt = require("bcrypt");
const userPublic = require("../../../domain/model/UserPublic")
module.exports = async (email, password, { userRepository, accessTokenManager }) => {
  const user = await userRepository.getByIdent(email);
  if (!user || !await bcrypt.compare(password,user.password)) {
    throwStatusCode(401,'Bad credentials')
  }
  return {
    user : new userPublic(user),
    token: accessTokenManager.generate(user)
  }

};
