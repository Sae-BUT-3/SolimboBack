'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (id_utilisateur, {userRepository, friendRepository}) => {
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) {
        throwStatusCode(400,'id utilisateur invalide')
    }
    
    const requests = await friendRepository.getRequestFriendsById(id_utilisateur)
    
    return requests
}