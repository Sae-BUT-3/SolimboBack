'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");
const etatsEnum = require('../../../domain/model/utils/EtatsEnum')
const rolesEnum = require('../../../domain/model/utils/RolesEnum')
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (pseudo, email,alias, bio, password,spotifyToken, { userRepository }) => {
  password = await bcrypt.hash(password,10)
  if(!password) {
    throwStatusCode('500','Internal server error')
  }
  const userTest = await userRepository.getByEmailOrPseudo(email,pseudo)
  if(userTest){
    throwStatusCode('403','Email ou Pseudo déjà existant')
  }
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
  return userRepository.persist(user)



};
