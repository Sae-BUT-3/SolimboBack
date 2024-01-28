const putReview = require("../../application/use_cases/solimbo/review/putReview");
const deleteReview = require("../../application/use_cases/solimbo/review/deleteReview");
const getReview = require("../../application/use_cases/solimbo/review/getReview");
const getReviews = require("../../application/use_cases/solimbo/review/getReviews");
const handleError = require("./utils/handleError");

module.exports = {

    async putReview(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {idOeuvre, note, description,type} = request.payload

            return handler.response(await putReview(idOeuvre, token, description, note,type, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async deleteReview(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {idReview} = request.payload
            await deleteReview(idReview, token, serviceLocator)
            return handler.response('').code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getReview(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const {idReview} = request.query

            return handler.response(await getReview(idReview, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getReviews(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const {page, pageSize, orderByLike} = request.query
            return handler.response(await getReviews(page,pageSize,orderByLike, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getUserReview(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const [, token ] = authorizationHeader.split(' ');
            const {idOeuvre, note, description,type} = request.payload

            return handler.response(await putReview(idOeuvre, token, description, note,type, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },

}