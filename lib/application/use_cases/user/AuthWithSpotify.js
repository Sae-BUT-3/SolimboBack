'use strict';

const User = require('../../../domain/model/User');
const throwStatusCode = require("../utils/throwStatusCode")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
module.exports = async (spotify_code, mobile, { userRepository,spotifyRepository,accessTokenManager}) => {
    const auth_url = mobile !== "true" ? `http://${process.env.FRONT_URL}` : `exp://${process.env.FRONT_URL_MOBILE}`
    console.log(mobile)
    const {access_token, refresh_token,error} = await spotifyRepository.getToken(spotify_code,auth_url)
    if(error){
        console.log(spotify_code)
        console.log(error)
        throwStatusCode(400,error.message)
    }
    console.log("peut etres")
    const {email,display_name,images} = await spotifyRepository.getAccountData(access_token)
    const image = images?.at(-1)?.url
    const userTest = await userRepository.getByEmailOrPseudo(email,email)
    if(userTest?.confirmed && userTest?.refresh_token){
        userTest.token = refresh_token
        userTest.refresh_token = refresh_token
        await userRepository.updateUser(userTest)
        return {
            email : email,
            token: accessTokenManager.generate(userTest)
        }
    }
    if(!userTest){
        // const password = await bcrypt.hash(crypto.randomBytes(16).toString('hex'),10)
        // if(!password) {
        //     throwStatusCode('500','Internal server error')
        // }
        const confirm_token = crypto.randomBytes(16).toString('hex')
        const userRaw = {
            email,
            alias: display_name ? display_name : null,
            photo: image ? image : null,
            confirmed:false,
            token: access_token,
            // password,
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
        }
    }
    if(!userTest.refresh_token || !userTest.confirm_token){
        throwStatusCode(403, 'erreur')
    }
    return {
        confirmToken: userTest.confirm_token
    }
};
