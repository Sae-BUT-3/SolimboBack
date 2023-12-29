'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");
const rolesEnum = require('../../../domain/model/utils/RolesEnum')
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (pseudo,alias, bio, password, photo,confirmToken, { userRepository,documentRepository }) => {
  password = await bcrypt.hash(password,10)
  if(!password) {
    throwStatusCode('500','Internal server error')
  }
  const userTest = await userRepository.getByEmailOrPseudo(pseudo,pseudo)
  if(userTest){
    throwStatusCode(403,'Pseudo déjà existant')
  }
  alias = alias ? alias : pseudo
  const user =  await userRepository.getByConfirmToken(confirmToken);
  if(!user) {
    throwStatusCode(400,'Token invalide')
  }
  user.alias = alias
  user.pseudo = pseudo
  user.bio = bio
  user.password = password
  user.confirm_token = null
  user.confirmed = true
  if(user.photo_temporaire && photo){
    documentRepository.deleteFile(user.photo_temporaire)
    user.photo_temporaire = photo
    user.photo = photo
  }
  return userRepository.updateUser(user)



};
