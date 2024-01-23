const putReview = require("../../application/use_cases/solimbo/putReview");
const handleError = require("./utils/handleError");

module.exports = {

    async putReview(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {idOeuvre, note, description} = request.payload

            await putReview(idOeuvre, token, description, note, serviceLocator)
            return handler.response('').code(200)
        }catch(error){
            return handleError(error)
        }
    },
}