"use strict";
const isImage = require("../utils/isImage");
const throwStatusCode = require("../utils/throwStatusCode");
const UserPublic = require("../../../domain/model/UserPublic");
module.exports = async (
  file,
  pseudo,
  bio,
  alias,
  isPrivate,
  token,
  { accessTokenManager, userRepository, documentRepository }
) => {
  const id = accessTokenManager.decode(token)?.value;
  const user = await userRepository.getByUser(id);
  if (!user)
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  if (file) {
    if (!isImage(file))
      throwStatusCode(415, "le fichier fourni n'est pas une image");
    const previewPath = user.photo;
    if (previewPath) {
      await documentRepository.deleteFile(previewPath);
    }
    const path = await documentRepository.uploadFile("upload", file);
    if (!path) throwStatusCode(500, "internal server error");
    user.photo = path;
  }
  if (pseudo) user.pseudo = pseudo;
  if (bio) user.bio = bio;
  if (alias) user.alias = alias;
  if (isPrivate !== undefined) user.is_private = isPrivate;

  await userRepository.updateUser(user);
  return new UserPublic(user);
};
