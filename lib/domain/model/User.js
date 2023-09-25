'use strict';

module.exports = class {

  constructor(id = null, pseudo, email, password,spotifyId,isBan = false,IsAdmin = false) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
    this.isBan = isBan;
    this.isAdmin = IsAdmin;
    this.spotifyId = spotifyId
  }

};