'use strict';

module.exports = class {

  constructor(id = null, pseudo, email,alias, bio, photo,tempPhoto, password,spotifyToken,id_role, banUntil) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.alias = alias
    this.photo = photo
    this.tempPhoto = tempPhoto
    this.spotifyToken = spotifyToken
    this.password = password;
    this.password = password;
    this.id_role = id_role;
    this.banUntil = banUntil
    this.type = 'user'
  }

};