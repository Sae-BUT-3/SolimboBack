'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const Friend = require('../../domain/model/Friend');
const User = require('../../domain/model/User');
const FriendRepositoryAbstract = require('./interfaces/FriendRepositoryAbstract'); 
const { Op } = require('sequelize');

module.exports = class  extends FriendRepositoryAbstract { 

  constructor() {
    super(); 
    this.db = sequelize;
    this.model = this.db.model('amis');
    this.UserModel = this.db.model('utilisateur');
  }

  async persist(friendEntity) {
    friendEntity.createdAt = sequelize.literal('CURRENT_TIMESTAMP');
    friendEntity.updatedAt = sequelize.literal('CURRENT_TIMESTAMP');
    console.log(friendEntity);
    const user = await this.model.create(friendEntity);
    user.save();
    return this.createAmis(user);
  }

  async getById(id_utilisateur, amiIdUtilisateur) {
    const user = await this.model.findOne({
      where: { 
        id_utilisateur : id_utilisateur,
        amiIdUtilisateur : amiIdUtilisateur
      },
    });
    return this.createAmis(user);
  }

  createAmis(seq) {
    return seq ? new Friend(seq) : null;
  }

  async getListFriendsById(id) {
    const idFriends = await this.model.findAll({
      attributes: ['amiIdUtilisateur'],
      where: {
        id_utilisateur: id,
        en_attente: false
      },
    });

    let friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: { [Op.in]: idFriends.map((f)=> f.getDataValue("amiIdUtilisateur"))}
      } 
    })
    return friends ? friends.map( f => new User(f)) : null;
  }

  async removeFriendById(id_utilisateur, amiIdUtilisateur) {
    const user = await this.model.destroy({
      where: {
        id_utilisateur: id_utilisateur,
        amiIdUtilisateur: amiIdUtilisateur
      }
    });
    return user;
  }

  async getRequestFriendsById(id) {
    const idFriends = await this.model.findAll({
      where: {
        en_attente: true,
        amiIdUtilisateur: id
      },
    });
    const friends = await this.UserModel.findAll({
      where: {
        id_utilisateur: { [Op.in]: idFriends.map((f)=> f.getDataValue("amiIdUtilisateur"))}
      } 
    })
    return friends ? friends.map( f => new User(f)) : null;
  }

  async accept(id, amiIdUtilisateur) {
    const user = await this.model.update(
      {
        en_attente: false,
        updatedAt: sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        where: {
          id_utilisateur: id,
          amiIdUtilisateur: amiIdUtilisateur
        }
      }
    );
    return this.createAmis(user);
  }

  async areFriends(id, amiIdUtilisateur) {
    const count = await this.model.count({
      where: {
        [Op.or]: [
          { id_utilisateur: id,
            amiIdUtilisateur: amiIdUtilisateur
          },
          { id_utilisateur: amiIdUtilisateur,
            amiIdUtilisateur: id
          },
        ]
      },
    });
    return count === 2
  }
};
