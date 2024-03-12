'use strict';
const sequelize = require('../orm/sequelize/sequelize');
const CommentRepository = require('./interfaces/CommentRepositoryAbstract')
module.exports = class extends CommentRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.comment = this.db.model('commentaire');
  }

  persist(id_review,description,id_utilisateur) {
    this.comment.create({
      id_review,
      description,
      id_utilisateur
    })
  }
  async getReviewComments(id_review,id_utilisateur) {
    const comments = await this.comment.findAll({
      attributes: {
        include: [
          [
              sequelize.literal('(SELECT COUNT(*) FROM like_commentaire WHERE like_commentaire.id_com = commentaire.id_com)'),
              'countLike'
          ],
          [
              sequelize.literal('(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_reponse = commentaire.id_com)'),
              'countComment'
          ],
        ],
      },
      where: {
        id_review,
        id_reponse: null
      }
    })
    console.log("teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeees")
    console.log(comments)
  }
};
