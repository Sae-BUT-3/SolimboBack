'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const user = require('../../domain/model/User');
const userRepository = require('./interfaces/UserRepositoryAbstract');
const { Op} = require('sequelize');
module.exports = class extends userRepository {

  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model('utilisateur');
  }

  async persist(userEntity) {
    const seqUser = await this.model.create(userEntity);
    await seqUser.save();
    return this.createUser(seqUser)
  }


  async getByIdent(ident){
    const seqUser = await this.model.findOne({
      where: {
        [Op.or]: [
          { pseudo : ident},
          { email : ident}
        ]
      },
    });
    return this.createUser(seqUser)
  }




  createUser(seqUser){
    if(!seqUser) return null
    return new user(seqUser);
  }
  async getByEmailOrPseudo(email, pseudo){
    const seqUser = await this.model.findOne({
      where: {
        [Op.or]: {
          pseudo: pseudo,
          email: email,
        }
      }
    });
    return this.createUser(seqUser)
  }

  async getUsersByPseudo(pseudo,limit) {
    let request = {where: {pseudo : {[Op.like]: `${pseudo}%`}}}
    if(limit) request.limit = limit
    let seqUsers =  await this.model.findAll(request);
    seqUsers = seqUsers.map(item => this.createUser(item.dataValues))
    return Object.values(seqUsers);
  }
  async getByUser(id){
    const seqUser = await this.model.findOne({
      where: {
        id_utilisateur : id
      }
    });
    return this.createUser(seqUser)
  }
  async getPreviewPath(id){
    const url = await this.model.findOne({
      where: {
        [Op.and]: [
          { id_utilisateur: id },
          sequelize.literal('NOT `photo_temporaire` <=> `photo`'),
        ]
      },
      attributes: ['photo_temporaire'],
      raw:true
    });
    return url?.photo_temporaire
  }
  async addPreviewPath(id,path){
    const [updatedRowsCount, updatedRows] = await this.model.update(
        {photo_temporaire: path},
        {where: {id_utilisateur: id}}
    )
    return updatedRowsCount
  }
  async updateUser(user){
    const { pseudo, email, password,alias, bio, id_role,ban_until,token,refresh_token,confirmed,confirm_token,photo, photo_temporaire } = user;
    const seqUser = await this.model.findOne({
      where: {
        id_utilisateur : user.id_utilisateur
      }
    });
    seqUser.pseudo = pseudo
    seqUser.email = email
    seqUser.alias = alias
    seqUser.bio = bio
    seqUser.password = password
    seqUser.token = token
    seqUser.refresh_token = refresh_token
    seqUser.id_role = id_role
    seqUser.ban_until = ban_until
    seqUser.confirmed = confirmed
    seqUser.confirm_token = confirm_token
    seqUser.photo = photo
    seqUser.photo_temporaire = photo_temporaire
    seqUser.save()
  }
  async getSpotifyAuthUser(){
    let seqUsers = await this.model.findAll({
      where: {
        token: {[Op.not]: null}
      }
    });
    seqUsers = seqUsers.map(item => this.createUser(item.dataValues))
    return seqUsers;
  }
  async removeUserByConfirmToken(confirmToken){
    const seqUsers = await this.model.findOne({
      where: {
        confirm_token: confirmToken
      }
    });
    if(seqUsers) {
      await seqUsers.destroy()
    }
  }
  removeUncheckedAccounts() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.model.destroy({
      where: {
        [Op.and]: [
          {updatedAt: {
              [Op.lt]: twentyFourHoursAgo
          }},
          {confirmed: false}
        ]

      }
    })
  }
  async getByConfirmToken(token) {
    const seqUsers = await this.model.findOne({
      where: {
        confirm_token: token
      }
    });
    return this.createUser(seqUsers)
  }
};

