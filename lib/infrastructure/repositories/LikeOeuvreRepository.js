'use strict';
const sequelize = require('../orm/sequelize/sequelize');
const LikeOeuvreRepositoryAbstract = require('./interfaces/LikeOeuvreRepositoryAbstract')
module.exports = class extends LikeOeuvreRepositoryAbstract {
  constructor() {
    super();
    this.db = sequelize;
    this.likeOeuvre = this.db.model('like_oeuvre');
  }

  like(userId, oeuvreId) {
    this.likeOeuvre.create({
      id_oeuvre: oeuvreId,
      id_user: userId
    })
  }

  unlike(userId, oeuvreId) {
    this.likeOeuvre.destroy({
      where: {
        id_oeuvre: oeuvreId,
        id_user: userId
      }
    })
  }
  async doesUserLikes(userId, oeuvreId) {
    const like = await this.likeOeuvre.findOne({
      where: {
        id_oeuvre: oeuvreId,
        id_user: userId
      }
    })
    return !!like
  }
  getLikeCount(oeuvreId) {
    return this.likeOeuvre.count({
      where: {
        id_oeuvre: oeuvreId,
      }
    })
  }
  async getOeuvreLikes(userId) {
    const likes = await this.likeOeuvre.findAll({
      where: {
        id_user: userId
      }
    })
    return likes
  }
};
