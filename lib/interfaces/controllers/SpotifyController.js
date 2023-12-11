const search = require("../../application/use_cases/spotify/Search");
const getAuthURL = require("../../application/use_cases/spotify/GetAuthURL");
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
    async getAuthURL(request,handler) {
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            const authURL = await getAuthURL(serviceLocator)
            return handler.response(authURL).code(200)
        }catch(error){
            return handleError(error)
        }
    }
}