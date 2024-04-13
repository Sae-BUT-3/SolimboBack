"use strict";
const formatPhoto = (photo) => {
  if (
    !photo ||
    "https://" === photo.substring(0, 8) ||
    "http://" === photo.substring(0, 7)
  )
    return photo;
  return `${process.env.API_URL}/${photo}`;
};
module.exports = class {
  constructor(userRaw) {
    this.id_utilisateur = userRaw?.id_utilisateur;
    this.pseudo = userRaw?.pseudo;
    this.email = userRaw?.email;
    this.alias = userRaw?.alias;
    this.photo = formatPhoto(userRaw?.photo);
    this.bio = userRaw?.bio;
    this.following_count = userRaw?.following_count;
    this.follower_count = userRaw?.follower_count;
    this.review_count = userRaw?.review_count;
    this.photo_temporaire = formatPhoto(userRaw?.photo_temporaire);
    this.id_role = userRaw?.id_role;
    this.ban_until = userRaw?.ban_until;
    this.is_private = userRaw?.is_private;
    this.auth_with_spotify = userRaw?.auth_with_spotify;
    this.type = "user";
  }
};
