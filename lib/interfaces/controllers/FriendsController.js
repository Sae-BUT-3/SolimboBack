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
        const {id_utilisateur, amiIdUtilisateur} = request.payload
        try{
            await followUser(id_utilisateur, amiIdUtilisateur, serviceLocator);
            return handler.response("Demande d'ami envoyée / Ajout d'ami bien effectué").code(200)
        }
        catch (e){
            return  handleError(e)
        }
    },

    async unfollowUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id_utilisateur, amiIdUtilisateur} = request.payload
        try{
            await unfollowUser(id_utilisateur, amiIdUtilisateur, serviceLocator);
            return handler.response("Suppression d'un ami bien effectuée").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async acceptRequestUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id_utilisateur, amiIdUtilisateur} = request.payload
        try{
            const user = await acceptRequestUser(id_utilisateur, amiIdUtilisateur, serviceLocator);
            return handler.response("Demande d'ami bien acceptée").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getListFriends(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id_utilisateur} = request.query
        try{
            const friends = await getListFriends(id_utilisateur, serviceLocator);
           return handler.response(friends).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getListFriendsRequest(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id_utilisateur} = request.query
        try{
            const requests = await getListFriendsRequest(id_utilisateur, serviceLocator);
            return handler.response(requests).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getProfilFriend(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id_utilisateur, amiIdUtilisateur} = request.query
        try{
            const user = await getProfilFriend(id_utilisateur, amiIdUtilisateur, serviceLocator);
            return handler.response(user).code(200)
        }
        catch (e){
            return handleError(e)
        }
    }
    
}
