'use strict';
const crypto = require("crypto");
module.exports = async (email,{userRepository ,mailRepository}) => {
    const user = await userRepository.getByEmailOrPseudo(email,email)
    if(!user || !user.confirmed) return false
    const reset_token = Math.floor(Math.random() * (99999 - 10000) + 10000)
    user.reset_token = reset_token
    await userRepository.updateUser(user)
    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: "réinitialisation de votre compte",
        subject: 'reinitialisation de votre mot de passe',
        text: reset_token
    };
    await mailRepository.send(mailOptions)

    setTimeout(()=>{
        delete user.reset_token
        userRepository.updateUser(user)
    },60*5*1000)
    return true
};
