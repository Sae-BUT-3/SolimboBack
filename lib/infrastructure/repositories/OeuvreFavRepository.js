'use strict';


const sequelize = require('../orm/sequelize/sequelize');
const { Op } = require('sequelize');
const OeuvreFav = require('../../domain/model/OeuvreFav.js');
const OeuvreFavRepositoryAbstract = require('./interfaces/OeuvreFavRepositoryAbstract');

module.exports = class extends  OeuvreFavRepositoryAbstract { // creer abstract

  constructor() {
    super();
    this.db = sequelize;
    this.oeuvreFav = this.db.model('oeuvre_favorite');
    this.oeuvresFavMax = 3;
  }
  createOeuvre(oeuvre)  {
    return oeuvre ? new OeuvreFav(oeuvre.dataValues) : null
  }
  async ajoutPossible(idUtilisateur){
    let nbOeuvresFav = await this.oeuvreFav.count({
      where: {
        id_utilisateur: idUtilisateur
      },
    });
    return nbOeuvresFav < this.oeuvresFavMax;
  }

  async addOeuvrefav(idUtilisateur, idOeuvre,type) {
    if(!await this.ajoutPossible(idUtilisateur)) return false
      const seqUser = await this.oeuvreFav.create({
        id_utilisateur: idUtilisateur,
        id_oeuvre: idOeuvre,
        createdAt: sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: sequelize.literal('CURRENT_TIMESTAMP'),
        type
      })
      await seqUser.save()
  }

  async deleteOeuvrefav(idUtilisateur, idOeuvre) {
      const seqUser = await this.oeuvreFav.destroy({
            where: {
              id_utilisateur: idUtilisateur,
              id_oeuvre: idOeuvre,
            }
          })
  }

  async oeuvreFavExists(idUtilisateur, idOeuvre) {
    let oeuvre = await this.oeuvreFav.findOne({
      where: {
        [Op.and]: {
          id_utilisateur: idUtilisateur,
          id_oeuvre: idOeuvre,
        }
      }
    })
    return !!oeuvre
  }

  async getOeuvresFav(idUtilisateur) {
    let oeuvresFav = await this.oeuvreFav.findAll({
      where: {
        id_utilisateur: idUtilisateur
      },
    });
    return oeuvresFav ? oeuvresFav.map(oeuvre => this.createOeuvre(oeuvre)) : null;
  }

};

