'use strict';

const sequelize = require('../orm/sequelize/sequelize');
module.exports =  class {

  constructor() {
    this.db = sequelize;
    this.model = this.db.model('notification');
  }

  async persist(notification) {
    console.log(notification)
    const seqUser = await this.model.findOrCreate({
      where: notification
    });
    return true
  }

};