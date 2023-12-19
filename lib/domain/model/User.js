'use strict';

module.exports = class {

  constructor(id = null, pseudo, email,alias, bio, photo,tempPhoto, password,token,refresh_token,id_role, banUntil) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.alias = alias
    this.photo = photo
    this.tempPhoto = tempPhoto
    this.token = token
    this.refresh_token = refresh_token
    this.password = password;
    this.password = password;
    this.id_role = id_role;
    this.banUntil = banUntil
    this.type = 'user'
  }

};