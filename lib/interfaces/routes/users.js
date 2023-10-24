'use strict';
// const UserSignUp = require('../../domain/entity/User/UserSignUp')
// const UserSignIn = require('../../domain/entity/User/UserSignIn')
const {userSignUp, userSignIn} = require('../../domain/entity/User/UserEntity')
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
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                204: {description : 'No content'},
                401: {description : 'Unauthorized'},
                403: {description : 'forbidden'},
                404: {description : 'Ressource not found'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
                503: {description : 'Service unavailable'},
              }
            }
          },
          validate: {
            payload: userSignUp
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
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                204: {description : 'No content'},
                401: {description : 'Unauthorized'},
                403: {description : 'forbidden'},
                404: {description : 'Ressource not found'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
                503: {description : 'Service unavailable'},
              }
            }
          },
          validate: {
            payload: userSignIn
          }
        },
      },
    ]);
  }
};