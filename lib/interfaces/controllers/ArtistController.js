'use strict';

const getArtist = require('../../application/use_cases/artist/getArtist');
const getArtistFollowers = require('../../application/use_cases/artist/getArtistFollowers');
const handleError = require("./utils/handleError");

module.exports = {
    
    async get(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {id} = request.params
        try{
            return handler.response(await getArtist(id,token, serviceLocator)).code(200)
        }
        catch (e){
            return  handleError(e)
        }
    },
    async getFollowers(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {id} = request.params
        try{
            return handler.response(await getArtistFollowers(id,token, serviceLocator)).code(200)
        }
        catch (e){
            return  handleError(e)
        }
    }
    
}
