'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (id_utilisateur, {userRepository}) => {
    const user = await userRepository.changePrivateStatus(id_utilisateur)
    if(!user) {
        throwStatusCode(400,'id utilisateur invalide')
    }
    return user
}