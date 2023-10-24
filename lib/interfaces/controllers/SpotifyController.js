const search = require("../../application/use_cases/spotify/search");
module.exports = {

    async search(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { query, filter, limit} = request.query
            const searchResult = await search(query,filter, limit)

        }catch(error){
            console.log(error)
            return handler.response(error).code(500)
        }
    }
}