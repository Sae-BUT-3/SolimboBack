'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const user = require('../../domain/model/User');
const userRepository = require('./interfaces/UserRepositoryAbstract');
const { Op } = require('sequelize');
const {id} = require("../../domain/model/User");
const {create} = require("underscore");
module.exports = class extends userRepository {

  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model('utilisateur');
  }

  async persist(userEntity) {
    const { pseudo, email, password,alias, bio, id_role,id_etat,spotifyToken } = userEntity;
    const seqUser = await this.model.create({
      pseudo : pseudo,
      email : email,
      alias : alias,
      bio : bio,
      password : password,
      token_spotify : spotifyToken,
      id_role : id_role,
      id_etat : id_etat });

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
    return new user(seqUser.id_utilisateur,
        seqUser.pseudo,
        seqUser.email,
        seqUser.alias,
        seqUser.bio,
        seqUser.photo,
        seqUser.photo_temporaire,
        seqUser.password,
        seqUser.token_spotify,
        seqUser.id_role,
        seqUser.ban_until);
  }
  async getByEmailOrPseudo(email, pseudo){
    const seqUser = await this.model.findOne({
      where: {
        [Op.or]: [
          { pseudo : email},
          { email : pseudo}
        ]
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
};
