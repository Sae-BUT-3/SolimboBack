'use strict';
const UserSignUp = require('../../domain/entity/User/UserSignUp')
const UserSignIn = require('../../domain/entity/User/UserSignIn')
const UsersController = require('../controllers/UsersController');
const Joi = require('@hapi/joi')
module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/users/signup',
        handler: UsersController.createUser,
        options: {
          description: 'Create a user',
          tags: ['api'],
          validate: {
            payload: UserSignUp
          }
        },
      },
      {
        method: 'POST',
        path: '/users/signin',
        handler: UsersController.signIn,
        options: {
          description: 'Get connexion autorization',
          tags: ['api'],
          validate: {
            payload: UserSignIn
          }
        },
      },
    ]);
  }
};