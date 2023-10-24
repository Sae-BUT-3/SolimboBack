'use strict';

module.exports = class {

  constructor(id = null, pseudo, email,alias, bio, password,spotifyToken,id_role, id_etat) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.alias = alias
    this.bio = bio
    this.spotifyToken = spotifyToken
    this.password = password;
    this.id_role = id_role;
    this.id_etat = id_etat
  }

};