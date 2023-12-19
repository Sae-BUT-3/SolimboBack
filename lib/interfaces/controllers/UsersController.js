'use strict';

const CreateUser = require('../../application/use_cases/user/CreateUser');
const GetAccessToken = require('../../application/use_cases/security/GetAccessToken');
const handleError = require("./utils/handleError")
const uploadPreview = require("../../application/use_cases/user/uploadPreview")
const refreshToken = require("../../application/use_cases/spotify/RefreshToken")
const getToken = require("../../application/use_cases/spotify/GetToken")
const {get} = require("axios");
module.exports = {

    async createUser(request,handler) {
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { pseudo, email, alias, bio, password,spotifyToken } = request.payload
            let token = null
            let refresh_token = null
            if(spotifyToken){
                const tokens = await getToken(spotifyToken,serviceLocator)
                token = tokens.token
                refresh_token = tokens.refresh_token
            }
            const user = await CreateUser(pseudo, email, alias, bio, password,token,refresh_token, serviceLocator);
            refreshToken(user.id,serviceLocator)
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
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {file} = request.payload
        try{
            return handler.response({
                path: `${request.server.info.uri}/${await uploadPreview(file,token, serviceLocator)}`
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
