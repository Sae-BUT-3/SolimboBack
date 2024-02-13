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
    const friend = await friendRepository.removeFriendById(id_utilisateur, amiIdUtilisateur)
    
    return friend
}