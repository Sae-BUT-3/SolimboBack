'use strict';

const getArtist = require('../../application/use_cases/artist/getArtist');


module.exports = {
    
    async get(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {artistId} = request.params
        try{
            return handler.response(await getArtist(artistId,token, serviceLocator)).code(200)
        }
        catch (e){
            return  handleError(e)
        }
    },

    
}
