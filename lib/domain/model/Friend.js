'use strict';

module.exports = class {

  constructor(userRaw) {
    this.id_utilisateur = userRaw?.id_utilisateur
    this.amiIdUtilisateur = userRaw?.amiIdUtilisateur
    this.en_attente = userRaw?.en_attente
    this.createdAt = userRaw?.createdAt
    this.updatedAt = userRaw?.updatedAt 
    this.type =  'amis'
  }
}