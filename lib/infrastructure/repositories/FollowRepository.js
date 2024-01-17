'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const user = require('../../domain/model/User');
const FollowRepository = require('./interfaces/FollowRepositoryAbstract');
const { Op} = require('sequelize');
module.exports = class extends FollowRepository {

  constructor() {
    super();
    this.db = sequelize;
    this.followModel = this.db.model('follow');
    this.artistModel = this.db.model('artiste');
  }

  async follow(userId, artistId) {
    let artist = await this.artistModel.findOne({
      where: {
        id_artiste: artistId
      }
    })
    if(!artist){
      artist = await this.artistModel.create({
        id_artiste: artistId,
        nb_suivis: 0
      })
    }
    artist.nb_suivis = artist.nb_suivis < 0 ? 0 : artist.nb_suivis
    artist.save()
    const follow = await this.followModel.create({
      id_utilisateur: userId,
      id_artiste: artistId
    });
    artist.nb_suivis += 1
    artist.save()
    await follow.save();
  }

  async unfollow(userId, artistId) {
    const artist = await this.artistModel.findOne({
      where: {
        id_artiste: artistId
      }
    })
    await this.followModel.destroy({
      where: {
        id_utilisateur: userId,
        id_artiste: artistId
      }
    })
    artist.nb_suivis -= 1
    artist.save()
  }
  async doesFollows(userId, artistId) {
    const follow = await this.followModel.findOne({
      where: {
        id_utilisateur: userId,
        id_artiste: artistId
      }
    })
    return !!follow
  }
};

