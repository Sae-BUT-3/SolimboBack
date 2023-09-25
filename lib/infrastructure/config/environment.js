'use strict';

const constants = require('./constants');

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
module.exports = (() => {

  const environment = {
    database: {
      dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MYSQL,
      url: process.env.DATABASE_URI || 'mysql://root:root@localhost:3306/test',
    }
  };

  if (process.env.NODE_ENV === 'test') {
    environment.database = {
      driver: constants.SUPPORTED_DATABASE.IN_MEMORY
    }
  }

  return environment;
})();
