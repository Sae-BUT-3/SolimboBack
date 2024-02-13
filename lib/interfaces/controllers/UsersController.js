'use strict';

const CreateUser = require('../../application/use_cases/user/CreateUser');
const CompleteAccount = require('../../application/use_cases/user/CompleteAccount');
const GetAccessToken = require('../../application/use_cases/security/GetAccessToken');
const handleError = require("./utils/handleError")
const uploadPreview = require("../../application/use_cases/user/uploadPreview")
const getUserByPseudo = require("../../application/use_cases/user/getUserByPseudo")
const getUserByConfirmToken = require("../../application/use_cases/user/getUserByConfirmToken")
const sendResetEmail = require("../../application/use_cases/user/sendResetEmail")
const resetPassword = require("../../application/use_cases/user/resetPassword")
const changePrivateStatus = require("../../application/use_cases/user/changePrivateStatus")
const refreshToken = require("../../application/use_cases/spotify/RefreshToken")
const throwStatusCode = require("../../application/use_cases/utils/throwStatusCode");
module.exports = {

    async confirmUser(request, handler) {
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { pseudo, photo, alias, bio, password,confirmToken } = request.payload
            const user = await CompleteAccount(pseudo, alias, bio, password,photo,confirmToken, serviceLocator);
            return handler.response('Votre compte a bien été validé').code(200)
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
    },
    async createUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {email,spotify_code} = request.payload
        try{
            const user = await CreateUser(email,spotify_code,serviceLocator);
            if(spotify_code){
                refreshToken(user.id_utilisateur,false,serviceLocator)
            }
            return handler.response("compte créé").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async isUser(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {pseudo} = request.query
        try{
            const user = await getUserByPseudo(pseudo,serviceLocator);
            return handler.response({isUser: !!user}).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async getUserByConfirmToken(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {confirmToken} = request.query
        try{
            const user = await getUserByConfirmToken(confirmToken,serviceLocator);
            if(!user)
                throwStatusCode(403,"no user")
            return handler.response(user).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async sendResetEmail(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {email} = request.payload
        try{
            await sendResetEmail(email,serviceLocator);
            return handler.response("un email a été envoyé").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async resetPassword(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {password,resetToken} = request.payload
        try{
            await resetPassword(password,resetToken,serviceLocator);
            return handler.response("un email a été envoyé").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async changePrivateStatus(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {id} = request.payload
        try{
            await changePrivateStatus(id,serviceLocator);
            return handler.response("Le statut du compte a bien été mis à jour").code(200)
        }
        catch (e){
            return handleError(e)
        }
    }
};
