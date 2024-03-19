'use strict';
const {Op} = require('sequelize');
const sequelize = require('../orm/sequelize/sequelize');
const CommentRepository = require('./interfaces/CommentRepositoryAbstract')
const Comment = require('../../domain/model/Comment');
const Utilisateur = require('../../domain/model/User');
module.exports = class extends CommentRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.comment = this.db.model('commentaire');
    this.user = this.db.model('utilisateur');
    this.review = this.db.model('review');
  }

  createComment(commentRaw) {
    return new Comment(commentRaw,new Utilisateur(commentRaw.user_review))
  }
  persist(id_review,description,id_utilisateur) {
    this.comment.create({
      id_review,
      description,
      id_utilisateur
    })
  }
  async getReviewComments(id_review,id_utilisateur,fetchPrivate,page,pageSize,orderByLike) {
    let whereClause = {
      id_review,
      id_reponse: null
    }
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    if(!fetchPrivate) {
      whereClause.id_utilisateur = id_utilisateur
        ? {[Op.in]: sequelize.literal(`(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id_utilisateur} OR id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id_utilisateur}))`)}
        : {[Op.in]: sequelize.literal(`(SELECT id_utilisateur FROM utilisateur WHERE is_private = false`)}
    }
    
    const comments = await this.comment.findAll({
      offset: offset,
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
      include: [
        {
          model: this.user,
          as: 'user_review',
        },
        // {
        //   model: this.review,
        //   include: [
        //     {
        //       model: this.user,
        //       as: "utilisateur",
        //     }
        //   ],
        // }
      ],
      where: {
        id_review,
        id_reponse: null
      },
      order,
      limit: pageSize,
    })
    return comments.map(comment => this.createComment(comment.dataValues))
  }
};
