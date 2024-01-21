const search = require("../../application/use_cases/spotify/Search");
const getAlbum = require("../../application/use_cases/spotify/getAlbum");
const getAuthURL = require("../../application/use_cases/spotify/GetAuthURL");
const fetchArtist = require("../../application/use_cases/spotify/FetchArtist");
const getTrack = require("../../application/use_cases/spotify/getTrack");
const getSearchFilters =  require("../../application/use_cases/spotify/getSearchFilters");
const handleError = require("./utils/handleError");
const fetchArtistSongs = require("../../application/use_cases/spotify/FetchArtistSongs");


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
    async fetchArtistSongs(request,handler){
        try {
            console.log("ICI")
            const serviceLocator = request.server.app.serviceLocator;
            let {id, filter, limit} = request.query
            console.log("id,  filter, limit ", id, filter, limit)
            const fetchArtistSongsResult = await fetchArtistSongs(id, filter, limit, serviceLocator)
            return handler.response(fetchArtistSongsResult).code(200) 
        }catch(error){
            return handleError(error)
        }
    },

    async getAuthURL(request,handler) {
        try{
            const authURL = await getAuthURL()
            return handler.response(authURL).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}