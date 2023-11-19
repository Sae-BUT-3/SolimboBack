'use strict';

const CreateUser = require('../../application/use_cases/user/CreateUser');
const GetAccessToken = require('../../application/use_cases/security/GetAccessToken');
const handleError = require("./utils/handleError")
const uploadPreview = require("../../application/use_cases/user/uploadPreview")
module.exports = {

    async createUser(request,handler) {
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { pseudo, email, alias, bio, password,spotifyToken } = request.payload
            await CreateUser(pseudo, email, alias, bio, password,spotifyToken, serviceLocator);
            return handler.response('Votre compte a bien été crée').code(200)
        }catch(error){
            return handleError(error)
        }
    },

    async signIn(request,handler){

        const serviceLocator = request.server.app.serviceLocator;
        const {email, password} = request.payload
        try{
            return handler
                .response({
                    email : email,
                    token: await GetAccessToken(email,password,serviceLocator)
                })
        }
        catch (error){
            return handleError(error)
        }
    },
    async uploadPreviewProfile(request, handler){
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        try{
            return handler.response({
                path: await uploadPreview(token, serviceLocator)
            })
        }
        catch (e){
            return handleError(e)
        }
        // Now 'token' contains the bearer token

        // Perform any necessary authentication logic here

        return handler.response('Access granted!');
    }
};
