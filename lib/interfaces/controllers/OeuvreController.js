'use strict';

const likeOeuvre = require('../../application/use_cases/oeuvre/likeOeuvre');
const handleError = require("./utils/handleError");

module.exports = {
    
    async like(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {id,type} = request.params
        try{
            await likeOeuvre(token,id,type, serviceLocator)
            return handler.response("").code(200)
        }
        catch (e){
            return  handleError(e)
        }
    },

    
}
