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
    if (!user) {
        throwStatusCode(400, 'Ce compte  n\'a pas pu être créé. Veuillez réessayer plus tard.')
    }

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'Votre token de confirmation pour votre connexion',
        html: `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Votre token de confirmation</title>
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f2f2f2;
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 40px;
                    }
                    .logo {
                        margin-bottom: 20px;
                    }
                    .token-container {
                        margin-bottom: 20px;
                        background-color: #f2f2f2;
                        border: 1px solid #dddddd;
                        border-radius: 5px;
                        padding: 10px;
                    }
                    .token {
                        font-size: 20px;
                        font-weight: bold;
                        color: #191414;
                    }
                    .connexion-button {
                        display: inline-block;
                        background-color: #1DB954;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <a href="https://ibb.co/hMcRgKj">
                        <img src="https://i.ibb.co/hMcRgKj/logo-solimbo.png"  alt="Logo Solimbo" class="logo">
                    </a>
                    <h1>Votre token de confirmation</h1><br/>
                    <p>Voici votre token de confirmation pour votre prochaine connexion sur Solimbo :</p>
                    <div class="token-container">
                        <p class="token">${confirm_token}</p>
                    </div>
                    <p>Utilisez ce token pour compléter votre inscription sur notre site.</p>
                    <a href="#" class="connexion-button">Se connecter</a>
                </div>
            </body>
            </html>
        `
    };

    await mailRepository.send(mailOptions)

    setTimeout(()=>{
        userRepository.removeUserByConfirmToken(confirm_token)
    },60*5*1000)
    return user
};
