'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const FollowRepository = require('./interfaces/FollowRepositoryAbstract');
const User = require("../../domain/model/User");
const {Op} = require('sequelize');

module.exports = class extends FollowRepository {

  constructor() {
    super();
    this.db = sequelize;
    this.followModel = this.db.model('follow');
    this.artistModel = this.db.model('artiste');
    this.userModel = this.db.model('utilisateur');
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

  async getFollowersCount(idArtist) {
    const artist = await this.artistModel.findOne({
      where: {
        id_artiste: idArtist
      }
    })
    return artist?.nb_suivis || 0
  }

  async getFriendsFollowing(idArtist,idUser,limit) {
    const users = await this.userModel.findAll({
      limit,
      include: [
        {
          model: this.artistModel,
          as: 'utilisateur_m_n',
          required: true,
          through: {
            where: {
              id_artiste: idArtist
            }
          }
        }
      ],
      where: {
       
        [Op.or]: [
          sequelize.literal(` utilisateur.id_utilisateur IN (SELECT amiIdUtilisateur FROM amis WHERE id_utilisateur = :idUser AND en_attente = false )`),
          sequelize.literal(`utilisateur.id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = :idUser AND en_attente = false )`)
        ]
      },
        replacements: {
            idUser: idUser
        }
    })
    
    return users.map(item => new User(item))
  }
  async getFriendsFollowingCount(idArtist,idUser) {
    const countUsers = await this.userModel.count({
      include: [
        {
          model: this.artistModel,
          as: 'utilisateur_m_n',
          required: true,
          through: {
            where: {
              id_artiste: idArtist
            }
          }
        }
      ],
      where: {
        [Op.or]: [
        sequelize.literal(` utilisateur.id_utilisateur IN (SELECT amiIdUtilisateur FROM amis WHERE id_utilisateur = :idUser AND en_attente = false )`),
        sequelize.literal(`utilisateur.id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = :idUser AND en_attente = false )`)
        ]
      },
      replacements: {
        idUser: idUser
      }
    })
    return countUsers
  }
  async getArtistFollowersWithoutFriends(idArtist,idUser,limit) {
    //affiche idUser s'il follow l'artiste
    const users = await this.userModel.findAll({
      limit,
      include: [
        {
          model: this.artistModel,
          as: 'utilisateur_m_n',
          required: true,
          through: {
            where: {
              id_artiste: idArtist
            }
          }
        }
      ],
      where: {
        //id_utilisateur: {[Op.notIn]: sequelize.literal(`(SELECT id_utilisateur FROM utilisateur WHERE id_utilisateur IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = ${idUser}))`)}
        [Op.and]: [
          sequelize.literal(`utilisateur.id_utilisateur not IN (SELECT id_utilisateur FROM amis WHERE amiIdUtilisateur = :idUser AND en_attente = false)`),
          sequelize.literal(`utilisateur.id_utilisateur  not IN (SELECT amiIdUtilisateur FROM amis WHERE id_utilisateur = :idUser AND en_attente = false)`),
        ]
      },
      replacements: {
        idUser: idUser
      }
    })  
    return users.map(item => new User(item))
  }
};

