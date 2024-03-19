const putReview = require("../../application/use_cases/review/putReview");
const deleteReview = require("../../application/use_cases/review/deleteReview");
const getReview = require("../../application/use_cases/review/getReview");
const getReviews = require("../../application/use_cases/review/getReviews");
const likeReview = require("../../application/use_cases/review/likeReview");
const getReviewLikes = require("../../application/use_cases/review/getReviewLikes");
const getUserReviews = require("../../application/use_cases/review/getUserReviews");
const putComment = require("../../application/use_cases/review/putComment");
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
            const {id} = request.params
            const {page, pageSize,orderByLike} = request.query
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            return handler.response(await getReview(id,token,page, pageSize,orderByLike, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getReviews(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const {page, pageSize, orderByLike} = request.query
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            return handler.response(await getReviews(page,pageSize,orderByLike,token, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async likeReview(request, handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const {id} = request.params
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            await likeReview(id,token,serviceLocator)
            return handler.response('').code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getLikes(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            const {id} = request.params
            const {page, pageSize} = request.query
            return handler.response(await getReviewLikes(id, token,page,pageSize, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async getUserReviews(request,handler){
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator; // a tous les repo
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            const {id} = request.params
            const {page, pageSize,orderByLike} = request.query
            return handler.response(await getUserReviews(id, token,page,pageSize,orderByLike, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async putComment(request,handler){
        try{
            const serviceLocator = request.server.app.serviceLocator;
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader?.split(' ')[1];
            const {id} = request.params
            const {description} = request.payload
            return handler.response(await putComment(token, id,description, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },
}