'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const User = require('../../domain/model/User');
const UserRepository = require('./UserRepository');

module.exports = class extends UserRepository {

  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model('user');
  }

  async persist(userEntity) {
    const { pseudo, email, password,isBan,isAdmin,spotifyId } = userEntity;
    console.log(userEntity)

    const seqUser = await this.model.create({
      Pseudo : pseudo,
      Email : email,
      Password : password,
      SpotifyId : spotifyId,
      IsBan: isBan,
      IsAdmin : isAdmin });
    await seqUser.save();
    console.log('dzadzadazdza')
    return new User(seqUser.id,
        seqUser.pseudo,
        seqUser.email,
        seqUser.password,
        seqUser.spotifyId,
        seqUser.isBan,
        seqUser.isAdmin);
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
    return new User(
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
