'use strict';

const CreateUser = require('../../application/use_cases/user/CreateUser');
const AuthWithSpotify = require('../../application/use_cases/user/AuthWithSpotify');
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
const follow = require("../../application/use_cases/user/follow");
const oeuvreFav = require("../../application/use_cases/user/oeuvreFav");
const getOeuvresFav = require("../../application/use_cases/user/getOeuvresFav");
 
module.exports = {

    async confirmUser(request, handler) {
        try{
            // Context
            const serviceLocator = request.server.app.serviceLocator;
            // Input

            let { pseudo, photo, alias, bio,confirmToken } = request.payload
            return handler.response(await CompleteAccount(pseudo, alias, bio,photo,confirmToken, serviceLocator)).code(200)
        }catch(error){
            return handleError(error)
        }
    },

    async signIn(request,handler){

        const serviceLocator = request.server.app.serviceLocator;
        const {email, password} = request.payload
        try{
            return handler.response(await GetAccessToken(email,password,serviceLocator)).code(200)
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
            }).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async authWithSpotify(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {spotify_code,callback} = request.payload
        try{
            const returnValue = await AuthWithSpotify(spotify_code,callback,serviceLocator);
            if(returnValue.idUtilisateur){
                refreshToken(returnValue.idUtilisateur,false,serviceLocator)
                delete returnValue.idUtilisateur
            }
            return handler.response(returnValue).code(200)

        }
        catch (e){
            return handleError(e)
        }
    },
    async createUser(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {email, password} = request.payload
        try{
            console.log(email, password)
            const user = await CreateUser(email,password,serviceLocator);

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
    async follow(request,handler) {
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {artistId} = request.payload
        try{
            const returnValue = await follow(token,artistId,serviceLocator)
                ? "artiste suivi"
                : "vous avez arrêté de suivre l'artiste"
            return handler.response(returnValue).code(200)
        }catch(error){
            return handleError(error)
        }
    },
    async changePrivateStatus(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        try{
            await changePrivateStatus(token,serviceLocator);
            return handler.response("Le statut du compte a bien été mis à jour").code(200)
        }
        catch (e){
            return handleError(e)
        }
    },
    async oeuvreFav(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        const {idOeuvre} = request.payload
        try{
           // await oeuvreFav(idOeuvre,serviceLocator);
            const returnValue = await oeuvreFav(token,idOeuvre,serviceLocator)
            ? "L'oeuvre a été rajoutée en favori"
            : "L'oeuvre a été retirée de vos favori"
        return handler.response(returnValue).code(200)
        }
        catch (e){
            return handleError(e)
        }
    },

    async getOeuvresFav(request, handler){
        const serviceLocator = request.server.app.serviceLocator;
        const authorizationHeader = request.headers.authorization;
        const [, token] = authorizationHeader.split(' ');
        try{
            const arrayOeuvresFav = await getOeuvresFav(token,serviceLocator)
            
        return handler.response(arrayOeuvresFav).code(200)
        }
        catch (e){
            return handleError(e)
        }
    }
};
