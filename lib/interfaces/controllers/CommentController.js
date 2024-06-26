const getComment = require("../../application/use_cases/comment/getComment");
const deleteComment = require("../../application/use_cases/comment/deleteComment");
const putComment = require("../../application/use_cases/comment/putComment");
const likeComment = require("../../application/use_cases/comment/likeComment");
const handleError = require("./utils/handleError");
module.exports = {

    async get(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {id} = request.params
            const {page, pageSize, orderByLike,lang} = request.query
            return handler.response(await getComment(id,page, pageSize, orderByLike, token,lang, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async delete(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {id} = request.params

            await deleteComment(id, token, serviceLocator)
            return handler.response('').code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async put(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {id} = request.params
            const {description} = request.payload
            return handler.response(await putComment(id,description,token, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async like(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {id} = request.params
            await likeComment(id,token, serviceLocator)
            return handler.response('').code(200)
        }catch(error){
            return handleError(error)
        }
    },
}