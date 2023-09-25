'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");

module.exports = async (pseudo, email, password,spotifyId, { userRepository }) => {
  password = await bcrypt.hash(password,10)
  if(!password)
    throw new Error('Internal server error')
  try{
    const user =  new User(null, pseudo, email, password,spotifyId);
    await userRepository.persist(user)
  }
  catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') throw new Error('email ou pseudo déjà existant')
    throw new Error('Internal server error')
  }

};
