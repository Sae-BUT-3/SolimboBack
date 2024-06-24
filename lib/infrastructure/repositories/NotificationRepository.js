'use strict';

const sequelize = require('../orm/sequelize/sequelize');
module.exports = {

  constructor() {
    super();
    this.db = sequelize;
    this.model = this.db.model('notification');
  },

  async persist(notification) {
    const seqUser = await this.model.findOrCreate(notification);
    await seqUser.save();
    return true
  }

};