"use strict";

const sequelize = require("../orm/sequelize/sequelize");
const ReviewRepository = require("./interfaces/ReviewRepositoryAbstract");
const { Op } = require("sequelize");
const User = require("../../domain/model/User");
const Review = require("../../domain/model/Review");
const { get } = require("underscore");
const getPreWhere = (fetchPrivate, id, friendsOnly) => {
  let whereClause = {
    deleted: false,
  };
  if (!fetchPrivate) {
    if (friendsOnly && id) {
      whereClause.id_utilisateur = {
        [Op.in]: sequelize.literal(
          `(SELECT id_utilisateur FROM utilisateur WHERE id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id} and en_attente = false) OR id_utilisateur IN (SELECT amiIdUtilisateur FROM amis WHERE id_utilisateur = ${id} and en_attente = false))`
        ),
      };
    } else {
      whereClause.id_utilisateur = id
        ? {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id} OR id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id} and en_attente = false) OR id_utilisateur IN (SELECT amiIdUtilisateur FROM amis WHERE id_utilisateur = ${id} and en_attente = false))`
            ),
          }
        : {
            [Op.in]: sequelize.literal(
              `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false`
            ),
          };
    }
  }
  return whereClause;
};
module.exports = class extends ReviewRepository {
  constructor() {
    super();
    this.db = sequelize;
    this.review = this.db.model("review");
    this.TypeReview = this.db.model("type_review");
    this.user = this.db.model("utilisateur");
    this.likeReviewModel = this.db.model("like_review");
  }
  createReview(seqReview) {
    if (!seqReview) return null;
    const type = seqReview.type_review.dataValues.libelle;
    return new Review(seqReview, new User(seqReview.utilisateur), type);
  }
  async persist(ReviewEntity) {
    let seqReview = await this.review.create(ReviewEntity, {
      include: [
        {
          model: this.user,
          as: "utilisateur",
          attributes: ["alias"],
        },
      ],
    });
    return this.getById(seqReview.id_review);
  }
  async getByUserAndId(id_oeuvre, id_utilisateur) {
    return await this.review.findOne({
      where: {
        id_oeuvre,
        id_utilisateur,
        deleted: false,
      },
    });
  }
  async getTypeReviewID(label) {
    const seqTypeReview = await this.TypeReview.findOne({
      where: {
        libelle: label,
      },
    });
    return seqTypeReview?.id_type_review;
  }

  async delete(id_review, id_utilisateur) {
    const seqReview = await this.review.findOne({
      where: {
        id_review,
        id_utilisateur,
      },
    });
    if (!seqReview) return false;
    seqReview.deleted = true;
    seqReview.save();
    return true;
  }
  async getById(id_review, deleted = false) {
    const seqReview = await this.review.findOne({
      where: {
        id_review: id_review,
        deleted,
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(DISTINCT like_review.id_utilisateur ) FROM like_review WHERE like_review.id_review = review.id_review)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_review = review.id_review and commentaire.deleted = false and commentaire.id_reponse is null)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "utilisateur",
        },
        {
          model: this.TypeReview,
          attributes: ["libelle"],
          as: "type_review",
        },
      ],
    });
    return this.createReview(seqReview);
  }

  async getReviews(page, pageSize, orderByLike, fetchPrivate, friendsOnly, id) {
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    let whereClause = getPreWhere(fetchPrivate, id, friendsOnly);
    const reviews = await this.review.findAll({
      limit: pageSize,
      offset: offset,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_review WHERE like_review.id_review = review.id_review)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_review = review.id_review and commentaire.deleted = false and commentaire.id_reponse is null)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "utilisateur",
        },
        {
          model: this.TypeReview,
          attributes: ["libelle"],
          as: "type_review",
        },
      ],
      order,
      where: whereClause,
    });
    return reviews.map((item) => this.createReview(item));
  }

  async getOeuvreReviews(
    page,
    pageSize,
    orderByLike,
    fetchPrivate,
    friendsOnly,
    ids_oeuvre,
    id
  ) {
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    let whereClause = getPreWhere(fetchPrivate, id, friendsOnly);
    if (Array.isArray(ids_oeuvre) && ids_oeuvre.length > 0) {
      whereClause.id_oeuvre = { [Op.in]: ids_oeuvre };
    } else {
      whereClause.id_oeuvre = ids_oeuvre;
    }

    const reviews = await this.review.findAll({
      limit: pageSize,
      offset: offset,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_review WHERE like_review.id_review = review.id_review)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_review = review.id_review and commentaire.deleted = false and commentaire.id_reponse is null)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "utilisateur",
        },
        {
          model: this.TypeReview,
          attributes: ["libelle"],
          as: "type_review",
        },
      ],
      order,
      where: whereClause,
    });
    return reviews.map((item) => this.createReview(item));
  }
  async doesUserLikes(id_utilisateur, id_review) {
    const count = await this.likeReviewModel.count({
      where: {
        id_utilisateur,
        id_review,
      },
    });
    return count > 0;
  }
  async likeReview(id_utilisateur, id_review) {
    const seqLike = await this.likeReviewModel.create({
      id_review,
      id_utilisateur,
    });
    await seqLike.save();
  }
  async unlikeReview(id_utilisateur, id_review) {
    await this.likeReviewModel.destroy({
      where: {
        id_utilisateur,
        id_review,
      },
    });
  }
  async getLikes(id_utilisateur, id_review, page, pageSize) {
    const offset = (page - 1) * pageSize;
    const whereClause = {};
    whereClause["$review_like->like_review.id_review$"] = id_review;
    whereClause.id_utilisateur = id_utilisateur
      ? {
          [Op.in]: sequelize.literal(
            `(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id_utilisateur} OR  id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${id_utilisateur}))`
          ),
        }
      : {
          [Op.in]: sequelize.literal(
            "(SELECT id_utilisateur FROM utilisateur WHERE is_private = false OR id_utilisateur=${id_utilisateur})"
          ),
        };
    const reviews = await this.review.findAll({
      offset: offset,
      include: [
        {
          model: this.user,
          as: "review_like",
          where: whereClause,
        },
      ],
    });
    const limit =
      reviews[0]?.review_like.length > pageSize
        ? pageSize
        : reviews[0]?.review_like.length;
    return reviews[0]?.review_like
      ? reviews[0]?.review_like.slice(0, limit)
      : [];
  }

  async getReviewByUserId(id_utilisateur, page, pageSize, orderByLike) {
    const offset = (page - 1) * pageSize;
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];

    const reviews = await this.review.findAll({
      offset: offset,
      limit: pageSize,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_review WHERE like_review.id_review = review.id_review)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_review = review.id_review and commentaire.deleted = false and commentaire.id_reponse is null)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "utilisateur",
        },
        {
          model: this.TypeReview,
          attributes: ["libelle"],
          as: "type_review",
        },
      ],
      where: {
        id_utilisateur,
        deleted: false,
      },
      order,
    });
    return reviews.map((item) => this.createReview(item));
  }

  async getOeuvreRating(id_oeuvre) {
    const seqReview = await this.review.findOne({
      where: {
        id_oeuvre,
        deleted: false,
      },
      attributes: [[sequelize.fn("AVG", sequelize.col("note")), "rating"]],
    });
    return seqReview.dataValues.rating;
  }

  async doesUserLike(id_utilisateur, id_review) {
    return !!(await this.likeReviewModel.findOne({
      where: {
        id_utilisateur,
        id_review,
      },
    }));
  }

  async getReviewCount(id_oeuvre) {
    return await this.review.count({
      where: {
        id_oeuvre,
        deleted: false,
      },
    });
  }

  async getCountReviewByUserId(id_utilisateur) {
    return await this.review.count({
      where: {
        id_utilisateur,
        deleted: false,
      },
    });
  }

  async geTimelineReviewCount(fetchPrivate, id) {
    let whereClause = {
      [Op.or]: [
        getPreWhere(fetchPrivate, id, false),
        {
          id_oeuvre: {
            [Op.in]: sequelize.literal(
              `(SELECT id_oeuvre from relation_oeuvre where id_artiste IN (SELECT id_artiste from follow where id_utilisateur=${id}))`
            ),
          },
        },
      ],
    };
    return await this.review.count({
      where: whereClause,
    });
  }
  async geTimeline(page, pageSize, orderByLike, fetchPrivate, id) {
    const orderColumn = orderByLike ? "countLike" : "createdAt";
    const order = [[sequelize.literal(orderColumn), "DESC"]];
    const offset = (page - 1) * pageSize;
    let whereClause = {
      [Op.or]: [
        getPreWhere(fetchPrivate, id, false),
        {
          id_oeuvre: {
            [Op.in]: sequelize.literal(
              `(SELECT id_oeuvre from relation_oeuvre where id_artiste IN (SELECT id_artiste from follow where id_utilisateur=${id}))`
            ),
          },
        },
      ],
    };
    const reviews = await this.review.findAll({
      limit: pageSize,
      offset: offset,
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like_review WHERE like_review.id_review = review.id_review)"
            ),
            "countLike",
          ],
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM commentaire WHERE commentaire.id_review = review.id_review and commentaire.deleted = false and commentaire.id_reponse = null)"
            ),
            "countComment",
          ],
        ],
      },
      include: [
        {
          model: this.user,
          as: "utilisateur",
        },
        {
          model: this.TypeReview,
          attributes: ["libelle"],
          as: "type_review",
        },
      ],
      order,
      where: whereClause,
    });
    return reviews.map((item) => this.createReview(item));
  }
};
