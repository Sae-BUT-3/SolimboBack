'use strict';

const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (token, {accessTokenManager, userRepository, friendRepository}) => {
    const id = accessTokenManager.decode(token)?.value
    const user = await userRepository.getByUser(id);
    if (!user) {
        throwStatusCode(400,"Votre token d'authentification n'est pas le bon");
    }
    
    const requests = await friendRepository.getRequestFriendsById(id)
    
    return requests
}