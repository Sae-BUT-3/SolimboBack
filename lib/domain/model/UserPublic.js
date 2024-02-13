'use strict';

module.exports = class {

    constructor(userRaw) {
<<<<<<< HEAD
        this.id_utilisateur = userRaw?.id_utilisateur
=======
>>>>>>> ff40bc4 (resolution conflits)
        this.pseudo = userRaw?.pseudo;
        this.email = userRaw?.email;
        this.alias = userRaw?.alias
        this.photo = userRaw?.photo
        this.photo_temporaire = userRaw?.photo_temporaire
        this.id_role = userRaw?.id_role;
        this.ban_until = userRaw?.ban_until
<<<<<<< HEAD
        this.is_private = userRaw?.is_private
=======
>>>>>>> ff40bc4 (resolution conflits)
        this.type =  'user'
    }

};