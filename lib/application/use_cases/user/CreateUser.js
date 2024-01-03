'use strict';

const User = require('../../../domain/model/User');
const bcrypt = require("bcrypt");
const rolesEnum = require('../../../domain/model/utils/RolesEnum')
const throwStatusCode = require("../utils/throwStatusCode")
const crypto = require("crypto");
module.exports = async (email,spotify_code, { userRepository,mailRepository,spotifyRepository}) => {
    let display_name,confirm_token,image,access_token,refresh_token,error
    if(spotify_code){
        ({access_token, refresh_token,error} = await spotifyRepository.getToken(spotify_code))
        if(error){
            throwStatusCode(400,error)
        }
        ({email,display_name,image} = await spotifyRepository.getAccountData(access_token))
        image = image?.at(-1)?.url
    }
    const userTest = await userRepository.getByEmailOrPseudo(email,email)
    if(userTest){
        throwStatusCode(403,'Email déjà existant')
    }
    confirm_token = crypto.randomBytes(16).toString('hex')
    const userRaw = {
        email,
        alias: display_name ? display_name : null,
        photo_temporaire: image ? image : null,
        confirmed:false,
        token: access_token,
        refresh_token,
        confirm_token
    }
    let user =  new User(
        userRaw);
    user = await userRepository.persist(user)

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'confirmToken',
        text: confirm_token
    };
    await mailRepository.send(mailOptions)

    setTimeout(()=>{
        userRepository.removeUserByConfirmToken(confirm_token)
    },1000*60*24)
    return user
};
