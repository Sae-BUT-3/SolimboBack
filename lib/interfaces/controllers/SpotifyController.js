const search = require("../../application/use_cases/spotify/Search");
const getAlbum = require("../../application/use_cases/spotify/getAlbum");
const getAuthURL = require("../../application/use_cases/spotify/GetAuthURL");
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

    async getAlbums(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input
            let {id} = request.query
            console.log(id)
            const result = await getAlbum(id, serviceLocator)
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
    async getAuthURL(request,handler) {
        try{
            const authURL = await getAuthURL()
            return handler.response(authURL).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}