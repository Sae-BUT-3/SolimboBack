'use strict';

const CreateUser = require('../../application/use_cases/user/CreateUser');
const GetAccessToken = require('../../application/use_cases/security/GetAccessToken');

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
            return handler.response(error).code(500)
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
            console.log(error)
            return handler.response(error).code(500)
        }
    }
};
