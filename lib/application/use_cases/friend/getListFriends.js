'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (id_utilisateur, {userRepository, friendRepository}) => {
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) {
        throwStatusCode(400,'id utilisateur invalide')
    }

    const friends = await friendRepository.getListFriendsById(id_utilisateur)
    
    return friends
}