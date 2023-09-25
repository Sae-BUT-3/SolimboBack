'use strict';

const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');
const sequelize = new Sequelize(environment.database.url);
const UserModel = require('./models/User')(sequelize)

module.exports = sequelize;