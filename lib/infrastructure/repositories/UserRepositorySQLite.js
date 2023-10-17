'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const user = require('../../domain/model/User');
const userRepository = require('./UserRepository');

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
    return new user(seqUser.id,
        seqUser.pseudo,
        seqUser.email,
        seqUser.password,
        seqUser.alias,
        seqUser.bio,
        seqUser.token_spotify,
        seqUser.id_role,
        seqUser.id_etat);
  }

  async merge(userEntity) {
    const seqUser = await this.model.findByPk(userEntity.id);

    if (!seqUser) return false;

    const { firstName, lastName, email, password } = userEntity;
    await seqUser.update({ firstName, lastName, email, password });

    // return new User(seqUser.IdUser, seqUser.Pseudo, seqUser.Password, seqUser.IsBan, seqUser.IsBan,seqUser.SpotifyId);
  }

  async remove(userId) {
    const seqUser = await this.model.findByPk(userId);
    if (seqUser) {
      return seqUser.destroy();
    }
    return false;
  }

  async get(userId) {
    const seqUser = await this.model.findByPk(userId);
    // return new User(seqUser.IdUser, seqUser.Pseudo, seqUser.Password, seqUser.IsBan, seqUser.IsBan,seqUser.SpotifyId);
  }

  async getByEmail(userEmail) {
    const seqUser = await this.model.findOne({ where: { Email: userEmail } });
    return new user(
        seqUser.IdUser,
        seqUser.Pseudo,
        seqUser.Email,
        seqUser.Password,
        seqUser.IsBan,
        seqUser.IsAdmin,
        seqUser.SpotifyId);
  }

  async find() {
    const seqUsers = await this.model.findAll();
    return seqUsers.map((seqUser) => {
      // return new User(seqUser.IdUser, seqUser.Pseudo, seqUser.Password, seqUser.IsBan, seqUser.IsBan,seqUser.SpotifyId);
    });
  }

};
