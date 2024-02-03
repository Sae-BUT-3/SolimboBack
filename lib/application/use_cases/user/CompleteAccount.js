'use strict';


const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (pseudo,alias, bio, photo,confirmToken, { userRepository,documentRepository, accessTokenManager }) => {
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
  user.confirm_token = null
  user.confirmed = true
  if(user.photo_temporaire && photo){
    documentRepository.deleteFile(user.photo_temporaire)
    user.photo_temporaire = photo
    user.photo = photo
  }
  await userRepository.updateUser(user)
  return {
    email: user.email,
    token: accessTokenManager.generate(user)
  }


};
