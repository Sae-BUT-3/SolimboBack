'use strict';

module.exports = class {

  constructor(oeuvreFavRaw) {
    this.id_oeuvre = oeuvreFavRaw?.id_oeuvre
    this.id_utilisateur = oeuvreFavRaw?.id_utilisateur
    this.type = oeuvreFavRaw?.type
  }
}