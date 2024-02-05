'use strict';

const User = require('../../../domain/model/User');
const throwStatusCode = require("../utils/throwStatusCode")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
module.exports = async (email,password, { userRepository,mailRepository}) => {
    const userTest = await userRepository.getByEmailOrPseudo(email,email)
    if(userTest){
        throwStatusCode(403,'Email déjà existant')
    }
    password = await bcrypt.hash(password,10)
    if(!password) {
        throwStatusCode('500','Internal server error')
    }
    const confirm_token = Math.floor(Math.random() * (99999 - 10000) + 10000)
    const userRaw = {
        email,
        confirmed:false,
        password,
        confirm_token
    }
    let user =  new User(
        userRaw);
    user = await userRepository.persist(user)

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'code de comfirmation de la création de votre compte',
        text: `vous avez crée votre compte voici votre mail code de confirmation : ${confirm_token}`
    };
    await mailRepository.send(mailOptions)

    setTimeout(()=>{
        userRepository.removeUserByConfirmToken(confirm_token)
    },60*5*1000)
    return user
};
