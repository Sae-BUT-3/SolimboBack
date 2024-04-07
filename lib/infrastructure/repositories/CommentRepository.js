"use strict";
const { Op } = require("sequelize");
const sequelize = require("../orm/sequelize/sequelize");
const CommentRepository = require("./interfaces/CommentRepositoryAbstract");
const Comment = require("../../domain/model/Comment");
const Utilisateur = require("../../domain/model/User");
module.exports = class extends CommentRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.comment = this.db.model("commentaire");
    this.user = this.db.model("utilisateur");
    this.likeCommentaire = this.db.model("like_commentaire");
  }

  createComment(commentRaw) {
    return new Comment(commentRaw, new Utilisateur(commentRaw.user_review));
  }
  async persist(id_review, description, id_utilisateur, id_reponse = null) {
    const seqComment = await this.comment.create({
      id_review,
      description,
      id_utilisateur,
      id_reponse,
    });
    return await this.getById(seqComment.id_com);
  }

  async getCommentsComments(
    id_reponse,
    id_utilisateur,
    fetchPrivate,
    page,
    pageSize,
    orderByLike
  ) {
    let whereClause = {
      id_reponse,
      deleted: false,
    };
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    if (!fetchPrivate) {
      whereClause.id_utilisateur = id_utilisateur
        ? {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id_utilisateur} OR id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id_utilisateur}))`
            ),
          }
        : {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false`
            ),
          };
    }
    const comments = await this.comment.findAll({
      offset: offset,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_commentaire WHERE like_commentaire.id_com = commentaire.id_com)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire AS comm2 WHERE comm2.id_reponse = commentaire.id_com)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "user_review",
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
      where: whereClause,
      order,
      limit: pageSize,
    });
    return comments.map((comment) => this.createComment(comment.dataValues));
  }
  async delete(id_com, id_utilisateur) {
    const seqComment = await this.comment.findOne({
      where: {
        id_com,
        id_utilisateur,
      },
    });
    if (!seqComment) return false;
    seqComment.deleted = true;
    await seqComment.save();
    return true;
  }

  async getById(id_com, deleted = false) {
    const comment = await this.comment.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_commentaire WHERE like_commentaire.id_com = commentaire.id_com)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire AS comm2 WHERE comm2.id_reponse = commentaire.id_com)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "user_review",
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
        id_com,
        deleted,
      },
    });
    return comment ? this.createComment(comment.dataValues) : null;
  }

  async doesUserLike(id_com, id_utilisateur) {
    const count = await this.likeCommentaire.count({
      where: {
        id_utilisateur,
        id_com,
      },
    });
    return count > 0;
  }
  async like(id_com, id_utilisateur) {
    const seqLike = await this.likeCommentaire.create({
      id_com,
      id_utilisateur,
    });
    await seqLike.save();
  }
  unlike(id_com, id_utilisateur) {
    this.likeCommentaire.destroy({
      where: {
        id_utilisateur,
        id_com,
      },
    });
  }

  async getReviewComments(
    id_review,
    id_utilisateur,
    fetchPrivate,
    page,
    pageSize,
    orderByLike
  ) {
    let whereClause = {
      id_review,
      id_reponse: null,
      deleted: false,
    };
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    if (!fetchPrivate) {
      whereClause.id_utilisateur = id_utilisateur
        ? {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id_utilisateur} OR id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id_utilisateur}))`
            ),
          }
        : {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false`
            ),
          };
    }

    const comments = await this.comment.findAll({
      offset: offset,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_commentaire WHERE like_commentaire.id_com = commentaire.id_com)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire AS comm2 WHERE comm2.id_reponse = commentaire.id_com)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "user_review",
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
      where: whereClause,
      order,
      limit: pageSize,
    });
    return comments.map((comment) => this.createComment(comment.dataValues));
  }
  async canDelete(id_com, id_utilisateur) {
    const count = await this.comment.count({
      where: {
        id_com,
        id_utilisateur,
      },
    });
    return count !== 0;
  }
};
