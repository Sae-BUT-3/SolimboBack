"use strict";

const sequelize = require("../orm/sequelize/sequelize");
const { Op } = require("sequelize");
const { assert } = require("joi");
const OeuvreFavRepositoryAbstract = require("./interfaces/OeuvreFavRepositoryAbstract");

module.exports = class extends OeuvreFavRepositoryAbstract {
  // creer abstract

  constructor() {
    super();
    this.db = sequelize;
    this.oeuvre = this.db.model("oeuvre");
    this.oeuvreRelation = this.db.model("relation_oeuvre");
    this.artist = this.db.model("artiste");
  }

  async persist(idOeuvre, artistIds) {
    await this.oeuvre.create({
      id_oeuvre: idOeuvre,
    });
    for (let artistId of artistIds) {
      await this.artistModel.findOrCreate({
        where: { id_artiste: artistId },
        defaults: { id_artiste: artistId },
      });
      this.oeuvreRelation.create({
        id_oeuvre: idOeuvre,
        id_artiste: artistId,
      });
    }
  }

  is_oeuvre_relation(id_oeuvre) {
    return this.oeuvreRelation.count({
      where: {
        id_oeuvre,
      },
    });
  }
};
