"use strict";

const sequelize = require("../orm/sequelize/sequelize");
const Friend = require("../../domain/model/Friend");
const User = require("../../domain/model/User");
const FriendRepositoryAbstract = require("./interfaces/FriendRepositoryAbstract");
const { Op } = require("sequelize");

module.exports = class extends FriendRepositoryAbstract {
  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model("amis");
    this.UserModel = this.db.model("utilisateur");
  }

  async persist(friendEntity) {
    friendEntity.createdAt = sequelize.literal("CURRENT_TIMESTAMP");
    friendEntity.updatedAt = sequelize.literal("CURRENT_TIMESTAMP");
    const user = await this.model.create(friendEntity);
    user.save();
    return this.createAmis(user);
  }
  async getById(id_utilisateur, amiIdUtilisateur) {
    const user = await this.model.findOne({
      where: {
        id_utilisateur: id_utilisateur,
        amiIdUtilisateur: amiIdUtilisateur,
      },
    });
    return this.createAmis(user);
  }

  createAmis(seq) {
    return seq ? new Friend(seq) : null;
  }

  async getListFriendsById(id) {
    const idFriends = await this.model.findAll({
      attributes: ["amiIdUtilisateur"],
      where: {
        id_utilisateur: id,
        en_attente: false,
      },
    });

    let friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: {
          [Op.in]: idFriends.map((f) => f.getDataValue("amiIdUtilisateur")),
        },
      },
    });
    return friends ? friends.map((f) => new User(f)) : null;
  }

  async removeFriendById(id_utilisateur, amiIdUtilisateur) {
    const user = await this.model.destroy({
      where: {
        id_utilisateur: id_utilisateur,
        amiIdUtilisateur: amiIdUtilisateur,
      },
    });
    return user;
  }

  async getRequestFriendsById(id) {
    const idFriends = await this.model.findAll({
      where: {
        en_attente: true,
        amiIdUtilisateur: id,
      },
    });
    const friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: {
          [Op.in]: idFriends.map((f) => f.getDataValue("id_utilisateur")),
        },
      },
    });
    return friends ? friends.map((f) => new User(f)) : null;
  }

  async getSendRequestFriendsById(id) {
    const idFriends = await this.model.findAll({
      where: {
        en_attente: true,
        id_utilisateur: id,
      },
    });
    const friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: {
          [Op.in]: idFriends.map((f) => f.getDataValue("amiIdUtilisateur")),
        },
      },
    });
    return friends ? friends.map((f) => new User(f)) : null;
  }

  async accept(id, amiIdUtilisateur) {
    const user = await this.model.update(
      {
        en_attente: false,
        updatedAt: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          id_utilisateur: id,
          amiIdUtilisateur: amiIdUtilisateur,
        },
      }
    );
    return this.createAmis(user);
  }

  async areFriends(id, amiIdUtilisateur) {
    if (id == amiIdUtilisateur) return true;
    const count = await this.model.count({
      where: {
        [Op.or]: [
          {
            id_utilisateur: id,
            amiIdUtilisateur: amiIdUtilisateur,
            en_attente: false,
          },
          {
            id_utilisateur: amiIdUtilisateur,
            amiIdUtilisateur: id,
            en_attente: false,
          },
        ],
      },
    });
    return count > 0;
  }

  async areMutualFriends(id, amiIdUtilisateur) {
    if (id == amiIdUtilisateur) return true;
    const count = await this.model.count({
      where: {
        [Op.and]: [
          {
            id_utilisateur: id,
            amiIdUtilisateur: amiIdUtilisateur,
            en_attente: false,
          },
          {
            id_utilisateur: amiIdUtilisateur,
            amiIdUtilisateur: id,
            en_attente: false,
          },
        ],
      },
    });
    return count > 0;
  }
  async doesFollows(id, amiIdUtilisateur) {
    if (id == amiIdUtilisateur) return true;
    const count = await this.model.count({
      where: {
        [Op.or]: [
          {
            id_utilisateur: id,
            amiIdUtilisateur: amiIdUtilisateur,
            en_attente: false,
          },
          {
            id_utilisateur: amiIdUtilisateur,
            amiIdUtilisateur: id,
            en_attente: false,
          },
        ],
      },
    });
    return count > 0;
  }
  async getFollowInfo(id_utilisateur, amiIdUtilisateur) {
    const areFriends = await this.areMutualFriends(id_utilisateur, amiIdUtilisateur);
    const relation1 = await this.model.findOne({
      where: {
        id_utilisateur: id_utilisateur,
        amiIdUtilisateur: amiIdUtilisateur,
      },
    });
    const relation2 = await this.model.findOne({
      where: {
        //if the other follows the user
        id_utilisateur: amiIdUtilisateur,
        amiIdUtilisateur: id_utilisateur,
      },
    });
    return areFriends
      ? {
          areFriends: true,
          doesFollows: true,
          isWaiting: false,
          isWaited: true,
          isFollowed: true,
        }
      : {
          areFriends: false,
          doesFollows: !!relation1,
          isWaiting: relation1 ? !!relation1.en_attente : false,
          isWaited: relation2 ? !!relation2.en_attente : false,
          isFollowed: !!relation2,
        };
  }
  async getListFollowers(id) {
    const idFriends = await this.model.findAll({
      where: {
        en_attente: false,
        amiIdUtilisateur: id,
      },
    });
    const friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: {
          [Op.in]: idFriends.map((f) => f.getDataValue("id_utilisateur")),
        },
      },
    });
    return friends ? friends.map((f) => new User(f)) : [];
  }
};
