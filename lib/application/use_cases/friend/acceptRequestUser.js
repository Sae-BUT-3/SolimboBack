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

    const friend = await friendRepository.accept(id_utilisateur, amiIdUtilisateur)
    if(!friend) {
        throwStatusCode(403,'Il existe aucune relation entre ces deux utilisateurs')
    }
    
    return friend
}

