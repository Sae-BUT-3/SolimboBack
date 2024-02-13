'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (token, amiIdUtilisateur, {accessTokenManager, userRepository, friendRepository}) => {
    const id = accessTokenManager.decode(token)?.value
    const user = await userRepository.getByUser(id);
    if (!user) {
        throwStatusCode(400,"Votre token d'authentification n'est pas le bon");
    }
    const ami = await userRepository.getByUser(amiIdUtilisateur)
    if(!ami) {
        throwStatusCode(400,'id ami invalide')
    }
    
    const profil = await friendRepository.getById(id, amiIdUtilisateur)
    if(!profil) {
        throwStatusCode(403,'Il existe aucune relation entre ces deux utilisateurs')
    }
    
    return ami
}