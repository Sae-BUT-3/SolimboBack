'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (token, {accessTokenManager, userRepository}) => {
    const id = accessTokenManager.decode(token)?.value
    const user = await userRepository.changePrivateStatus(id)
    if (!user) {
        throwStatusCode(400,"Votre token d'authentification n'est pas le bon");
    }
    return user
}