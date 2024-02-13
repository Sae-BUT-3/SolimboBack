'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (id_utilisateur, amiIdUtilisateur, {userRepository, friendRepository}) => {
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) {
        throwStatusCode(400,'id utilisateur invalide')
    }
    const ami = await userRepository.getByUser(amiIdUtilisateur)
    if(!ami) {
        throwStatusCode(400,'id ami invalide')
    }
    
    const profil = await friendRepository.getById(id_utilisateur, amiIdUtilisateur)
    if(!profil) {
        throwStatusCode(403,'Il existe aucune relation entre ces deux utilisateurs')
    }
    
    return ami
}