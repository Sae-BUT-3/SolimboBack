const search = require("../../application/use_cases/spotify/Search");
// peut pas optimiser ? 
const fetchArtist = require("../../application/use_cases/spotify/FetchArtist");
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
    },

    // tous les parametre dans get se retrouve dans la query 
    async fetchArtist(request,handler){
        try {
            const serviceLocator = request.server.app.serviceLocator;
            const id = request.query.query
            const fetchArtistResult = await fetchArtist(id, serviceLocator) 
            return handler.response(fetchArtistResult).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}