const search = require("../../application/use_cases/spotify/Search");
const getAlbum = require("../../application/use_cases/spotify/getAlbum");
const getTrack = require("../../application/use_cases/spotify/getTrack");
const handleError = require("./utils/handleError");
module.exports = {

    async search(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { query, spotify_filter, limit, allow_user} = request.query
            const searchResult = await search(query,spotify_filter, limit,allow_user, serviceLocator)
            return handler.response(searchResult).code(200)
        }catch(error){
            return handleError(error)
        }
    },

    async getAlbums(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input
            let {id} = request.query
            const result = await getAlbum(id, serviceLocator)
            return handler.response(result).code(200)
        }catch(error){
            return handleError(error)
        }
    },

    async getTracks(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input
            let {id} = request.query
            const result = await getTrack(id, serviceLocator)
            return handler.response(result).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}