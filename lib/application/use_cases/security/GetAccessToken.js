'use strict';

const bcrypt = require("bcrypt");
module.exports = async (email, password, { userRepository, accessTokenManager }) => {
  const user = await userRepository.getByIdent(email);
  if (!user || !await bcrypt.compare(password,user.password)) {
    throw new Error('Bad credentials');
  }
  return accessTokenManager.generate({ uid: user.id });
};
