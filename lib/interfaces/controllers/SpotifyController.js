const search = require("../../application/use_cases/spotify/Search");
const fetchArtist = require("../../application/use_cases/spotify/FetchArtist");
const getAuthURL = require("../../application/use_cases/spotify/GetAuthURL");
const handleError = require("./utils/handleError");

module.exports = {

    async search(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo 
            // Input
            // spotify_filter = type de l'API Spotify 
            let { query, spotify_filter, limit, allow_user} = request.query
            const searchResult = await search(query,spotify_filter, limit,allow_user, serviceLocator)
            return handler.response(searchResult).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}