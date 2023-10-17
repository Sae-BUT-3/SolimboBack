'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");
const etatsEnum = require('../../../domain/model/utils/EtatsEnum')
const rolesEnum = require('../../../domain/model/utils/RolesEnum')
module.exports = async (pseudo, email,alias, bio, password,spotifyToken, { userRepository }) => {
  password = await bcrypt.hash(password,10)
  if(!password)
    throw new Error('Internal server error')
  try{

    const user =  new User(
        null,
        pseudo,
        email,
        alias,
        bio,
        password,
        spotifyToken,
        rolesEnum.UTILISATEUR,
        etatsEnum.LIBRE);
    return await userRepository.persist(user)
  }
  catch (error) {
    if(error?.name === 'SequelizeUniqueConstraintError') throw new Error('email ou pseudo déjà existant')
    console.log(error)
    throw new Error('Internal server error')
  }

};
