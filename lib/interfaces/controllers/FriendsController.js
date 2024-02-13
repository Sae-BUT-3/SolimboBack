'use strict';

const followUser = require('../../application/use_cases/friend/followUser')
const acceptRequestUser = require('../../application/use_cases/friend/acceptRequestUser')
const unfollowUser = require('../../application/use_cases/friend/unfollowUser')
const getListFriends = require('../../application/use_cases/friend/getListFriends')
const getListFriendsRequest = require('../../application/use_cases/friend/getListFriendsRequest')
const getProfilFriend = require('../../application/use_cases/friend/getProfilFriend')
const handleError = require("./utils/handleError")

module.exports = {
    
    async followUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {amiIdUtilisateur} = request.payload
        try{
            await followUser(token, amiIdUtilisateur, serviceLocator);
            return handler.response("Demande d'ami envoyée / Ajout d'ami bien effectué").code(200)
        }
        catch (e){
            return  handleError(e)
        }
    },

    async unfollowUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {amiIdUtilisateur} = request.payload
        try{
            await unfollowUser(token, amiIdUtilisateur, serviceLocator);
            return handler.response("Suppression d'un ami bien effectuée").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async acceptRequestUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {amiIdUtilisateur} = request.payload;
        try{
            const user = await acceptRequestUser(token, amiIdUtilisateur, serviceLocator);
            return handler.response("Demande d'ami bien acceptée").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getListFriends(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        try{
            const friends = await getListFriends(token, serviceLocator);
           return handler.response(friends).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getListFriendsRequest(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        try{
            const requests = await getListFriendsRequest(token, serviceLocator);
            return handler.response(requests).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getProfilFriend(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {amiIdUtilisateur} = request.payload
        try{
            const user = await getProfilFriend(token, amiIdUtilisateur, serviceLocator);
            return handler.response(user).code(200)
        }
        catch (e){
            return handleError(e)
        }
    }
    
}
