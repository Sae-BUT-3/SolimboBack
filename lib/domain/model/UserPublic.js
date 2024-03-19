'use strict';

module.exports = class {

    constructor(userRaw) {
        this.id_utilisateur = userRaw?.id_utilisateur
        this.pseudo = userRaw?.pseudo;
        this.email = userRaw?.email;
        this.alias = userRaw?.alias
        this.photo = userRaw?.photo
        this.bio = userRaw?.bio
        this.photo_temporaire = userRaw?.photo_temporaire
        this.id_role = userRaw?.id_role;
        this.ban_until = userRaw?.ban_until
        this.is_private = userRaw?.is_private
        this.type =  'user'
    }

};