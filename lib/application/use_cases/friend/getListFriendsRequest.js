'use strict';

const throwStatusCode = require("../utils/throwStatusCode")
const UserPublic = require("../../../domain/model/UserPublic.js");
const ListsFriendsRequestsPage = require("../../../domain/model/ListsFriendsRequestsPage.js"); 


module.exports = async (token, {accessTokenManager, userRepository, friendRepository}) => {
    const id = accessTokenManager.decode(token)?.value
    const user = await userRepository.getByUser(id);
    if (!user) {
        throwStatusCode(400,"Votre token d'authentification n'est pas le bon");
    }
    
    const usersRequestsReceived = await friendRepository.getRequestFriendsById(id)
    const usersRequestsSend = await friendRepository.getSendRequestFriendsById(id)

    const usersPrivateRequestsReceived = await Promise.all(usersRequestsReceived.map(async (userPublic) => new UserPublic(userPublic)));
    const usersPrivateRequestsSend = await Promise.all(usersRequestsSend.map(async (userPublic) => new UserPublic(userPublic)));
 
    return new ListsFriendsRequestsPage(usersPrivateRequestsReceived, usersPrivateRequestsSend)
}