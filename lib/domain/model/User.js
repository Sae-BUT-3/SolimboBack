'use strict';

module.exports = class {

  constructor(userRaw) {
    this.id_utilisateur = userRaw?.id_utilisateur
    this.pseudo = userRaw?.pseudo
    this.email = userRaw?.email
    this.alias = userRaw?.alias
    this.photo = userRaw?.photo
    this.photo_temporaire = userRaw?.photo_temporaire
    this.token = userRaw?.token
    this.refresh_token = userRaw?.refresh_token
    this.reset_token = userRaw?.reset_token
    this.password = userRaw?.password;
    this.id_role = userRaw?.id_role;
    this.ban_until = userRaw?.ban_until
    this.confirmed= userRaw?.confirmed
    this.confirm_token = userRaw?.confirm_token
    this.is_private = userRaw?.is_private 
    this.type =  'user'
  }

};