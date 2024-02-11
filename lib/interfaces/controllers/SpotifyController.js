const search = require("../../application/use_cases/spotify/Search");
const getAlbum = require("../../application/use_cases/spotify/getAlbum");
const fetchArtist = require("../../application/use_cases/spotify/FetchArtist");
const getTrack = require("../../application/use_cases/spotify/getTrack");
const getSearchFilters =  require("../../application/use_cases/spotify/getSearchFilters");
const handleError = require("./utils/handleError");

module.exports = {

    async search(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo 
            // Input
            // spotify_filter = type de l'API Spotify 
            let { query, spotify_filter, limit} = request.query
            const searchResult = await search(query,spotify_filter, limit, serviceLocator)
            return handler.response(searchResult).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getSearchFilters(request,handler){
        try{

            const searchFilters = await getSearchFilters()
            return handler.response(searchFilters).code(200)
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
    },

    async fetchArtist(request,handler){
        try {
            const serviceLocator = request.server.app.serviceLocator;
            const id = request.query.query
            const fetchArtistResult = await fetchArtist(id, serviceLocator) 
            return handler.response(fetchArtistResult).code(200) // tout s est bien passe 
        }catch(error){
            return handleError(error)
        }
    },
}