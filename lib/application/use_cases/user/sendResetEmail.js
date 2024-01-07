'use strict';
const crypto = require("crypto");
module.exports = async (email,{userRepository ,mailRepository}) => {
    const user = await userRepository.getByEmailOrPseudo(email,email)
    if(!user || !user.confirmed) return false
    const reset_token = crypto.randomBytes(16).toString('hex')
    user.reset_token = reset_token
    await userRepository.updateUser(user)
    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'reinitialisation de votre mot de passe',
        text: reset_token
    };
    await mailRepository.send(mailOptions)

    setTimeout(()=>{
        delete user.reset_token
        userRepository.updateUser(user)
    },3600*1000)
    return true
};
