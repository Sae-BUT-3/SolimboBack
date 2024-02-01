'use strict';

const User = require('../../../domain/model/User');
const throwStatusCode = require("../utils/throwStatusCode")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
module.exports = async (spotify_code, { userRepository,spotifyRepository,accessTokenManager}) => {
    const {access_token, refresh_token,error} = await spotifyRepository.getToken(spotify_code)
    if(error){
        throwStatusCode(400,error.message)
    }
    const {email,display_name,images} = await spotifyRepository.getAccountData(access_token)
    const image = images?.at(-1)?.url
    const userTest = await userRepository.getByEmailOrPseudo(email,email)
    if(userTest && userTest.confirmed){
        userTest.token = refresh_token
        userTest.refresh_token = refresh_token
        await userRepository.updateUser(userTest)
        return {
            email : email,
            token: accessTokenManager.generate({
                sub: 'my-sub', // needs to match definition above
                value: userTest.id_utilisateur, // this is a custom key I used, it could be named anything. Value should be a way to authenticate the user
                aud: 'urn:audience:test', // needs to match definition above
                iss: 'urn:issuer:test', // needs to match definition above,
                expiresIn: '365d'
            })
        }
    }
    if(!userTest){
        const password = await bcrypt.hash(crypto.randomBytes(16).toString('hex'),10)
        if(!password) {
            throwStatusCode('500','Internal server error')
        }
        const confirm_token = crypto.randomBytes(16).toString('hex')
        const userRaw = {
            email,
            alias: display_name ? display_name : null,
            photo: image ? image : null,
            confirmed:false,
            token: access_token,
            password,
            refresh_token,
            confirm_token
        }
        const user =  new User(
            userRaw);
        await userRepository.persist(user)
        setTimeout(()=>{
            userRepository.removeUserByConfirmToken(confirm_token)
        },3600*1000*24)
        return {
            confirmToken: confirm_token,
            idUtilisateur: user.id_utilisateur
        }
    }
    if(!userTest.confirm_token){
        throwStatusCode(500, 'erreur avec cette utilisateur veuillez contacter le support')
    }
    return {
        confirmToken: userTest.confirm_token
    }
};
