"use strict";

const Friend = require("../../../domain/model/Friend");
const throwStatusCode = require("../utils/throwStatusCode");

module.exports = async (
  token,
  amiIdUtilisateur,
  { accessTokenManager, friendRepository, userRepository, mailRepository }
) => {
  const id = accessTokenManager.decode(token)?.value;
  const user = await userRepository.getByUser(id);
  if (!user) {
    throwStatusCode(400, "Votre token d'authentification n'est pas le bon");
  }
  const ami = await userRepository.getByUser(amiIdUtilisateur);
  if (!ami) {
    throwStatusCode(400, "id ami invalide");
  }
  const followInfo = await friendRepository.getFollowInfo(id, amiIdUtilisateur);
  if (followInfo.doesFollows) {
    friendRepository.removeFriendById(id, amiIdUtilisateur);
    return;
  }
  const userRaw = {
    id_utilisateur: id,
    amiIdUtilisateur: amiIdUtilisateur,
    en_attente: ami.is_private,
    createdAt: undefined,
    updatedAt: undefined,
  };

  let friend = new Friend(userRaw);
  friend = await friendRepository.persist(friend);
  if (ami.is_private) {
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: ami.email,
      subject: "Nouvelle demande d'ami sur Solimbo",
      html: `
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nouvelle demande d'ami sur Solimbo</title>
                    <style>
                        body {
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            background-color: #2a2a2a;
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
                        .button {
                            display: inline-block;
                            background-color: #1DB954;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-weight: bold;
                        }
                        .message {
                            margin-bottom: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <a href="https://ibb.co/hMcRgKj">
                            <img src="https://i.ibb.co/hMcRgKj/logo-solimbo.png"  alt="Logo Solimbo" class="logo">
                        </a>
                        <h1>Nouvelle demande d'ami sur Solimbo</h1>
                        <div class="message">
                            <p>Bonjour,</p>
                            <p>Vous avez reçu une nouvelle demande d'ami sur Solimbo de la part de <strong>${user.pseudo}</strong>.</p>
                            <p>Connectez-vous à Solimbo pour accepter ou rejeter la demande.</p>
                        </div>
                        <a href="#" class="button">Accepter la demande</a>
                    </div>
                </body>
                </html>
            `,
    };
    await mailRepository.send(mailOptions);
  }
  return friend;
};
