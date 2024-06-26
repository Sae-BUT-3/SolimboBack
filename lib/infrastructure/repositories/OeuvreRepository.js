"use strict";

const sequelize = require("../orm/sequelize/sequelize");

module.exports = class {
  // creer abstract

  constructor() {
    this.db = sequelize;
    this.oeuvre = this.db.model("oeuvre");
    this.oeuvreRelation = this.db.model("relation_oeuvre");
    this.artist = this.db.model("artiste");
  }

  async persist(idOeuvre, artistIds) {
    await this.oeuvre.findOrCreate({
      where: { id_oeuvre: idOeuvre },
      defaults: { id_oeuvre: idOeuvre },
    });
    for (let artistId of artistIds) {
      await this.artist.findOrCreate({
        where: { id_artiste: artistId },
        defaults: { id_artiste: artistId },
      });
      this.oeuvreRelation.create({
        id_oeuvre: idOeuvre,
        id_artiste: artistId,
      });
    }
  }

  async is_oeuvre_relation(id_oeuvre) {
    return (
      (await this.oeuvreRelation.count({
        where: {
          id_oeuvre,
        },
      })) > 1
    );
  }
};
