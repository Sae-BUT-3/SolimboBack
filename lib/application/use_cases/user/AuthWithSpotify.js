"use strict";

const User = require("../../../domain/model/User");
const throwStatusCode = require("../utils/throwStatusCode");
const UserPublic = require("../../../domain/model/UserPublic");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
module.exports = async (
  spotify_code,
  callback,
  { userRepository, spotifyRepository, accessTokenManager }
) => {
  const { access_token, refresh_token, error } =
    await spotifyRepository.getToken(spotify_code, callback);
  if (error) {
    throwStatusCode(400, error.message);
  }
  const { email, display_name, images } =
    await spotifyRepository.getAccountData(access_token);
  const image = images?.at(-1)?.url;
  const userTest = await userRepository.getByEmailOrPseudo(email, email);
  console.log(userTest);
  if (userTest?.confirmed && userTest?.refresh_token) {
    userTest.token = refresh_token;
    userTest.refresh_token = refresh_token;
    await userRepository.updateUser(userTest);
    return {
      user: new UserPublic(userTest),
      token: accessTokenManager.generate(userTest),
    };
  }
  if (!userTest) {
    const confirm_token = crypto.randomBytes(16).toString("hex");
    const userRaw = {
      email,
      alias: display_name ? display_name : null,
      photo: image ? image : null,
      confirmed: false,
      token: access_token,
      auth_with_spotify: true,
      refresh_token,
      confirm_token,
    };
    const user = new User(userRaw);
    await userRepository.persist(user);
    setTimeout(() => {
      userRepository.removeUserByConfirmToken(confirm_token);
    }, 3600 * 1000 * 24);
    return {
      confirmToken: confirm_token,
    };
  }
  if (!userTest.auth_with_spotify) {
    throwStatusCode(403, "un compte existe déjà avec ce mail");
  }
  return {
    confirmToken: userTest.confirm_token,
  };
};
