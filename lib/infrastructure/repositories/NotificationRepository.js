"use strict";

const sequelize = require("../orm/sequelize/sequelize");
const User = require("../../domain/model/User");
const Review = require("../../domain/model/Review");
const Commentaire = require("../../domain/model/Comment");
const Notification = require("../../domain/model/Notification");
const { Op } = require("sequelize");
module.exports = class {
  constructor() {
    this.db = sequelize;
    this.model = this.db.model("notification");
    this.user = this.db.model("utilisateur");
    this.commentaire = this.db.model("commentaire");
    this.review = this.db.model("review");
    this.TypeReview = this.db.model("type_review");
  }
  createNotification(notification) {
    return new Notification(
      notification,
      new User(notification.Sender),
      new User(notification.Receiver),
      notification.Commentaire
        ? new Commentaire(notification.Commentaire)
        : null,
      notification.Review ? new Review(notification.Review,new User(notification.Receiver),notification.Review.type_review.dataValues.libelle) : null,
      notification.Reply ? new Commentaire(notification.Reply) : null,
    );
  }
  async persist(notification) {
    const seqUser = await this.model.findOrCreate({
      where: notification,
    });
    return true;
  }
  destroy(notification) {
    return this.model.destroy({
      where: notification,
    });
  }
  async setOld(notifIds) {
    this.model.update(
      {
        is_old: true,
      },
      {
        where: {
          id_notification: {[Op.in]: notifIds},
        },
      }
    )
  }
  async getNotifications(id_utilisateur, page, pageSize) {
    const offset = (page - 1) * pageSize;
    const notifications = await this.model.findAll({
      offset: offset,
      limit: pageSize,
      where: {
        receiver: id_utilisateur,
      },
      include: [
        {
          model: this.user,
          as: "Sender",
        },
        {
          model: this.user,
          as: "Receiver",
        },
        {
          model: this.commentaire,
          as: "Commentaire",
        },
        {
          model: this.commentaire,
          as: "Reply",
        },
        {
          model: this.review,
          as: "Review",
          include: [
            {
              model: this.TypeReview,
              attributes: ["libelle"],
              as: "type_review",
            },
          ]
        },
      ],
      order: [[sequelize.literal("createdAt"), "DESC"]]
    });
    return notifications.map((notification) =>
      this.createNotification(notification)
    );
  }
};
