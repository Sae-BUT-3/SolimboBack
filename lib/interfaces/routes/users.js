'use strict';
const {userSignUp, userSignIn} = require('../../domain/entity/UserEntity')
const UsersController = require('../controllers/UsersController');
const Joi = require('joi')
const MAX_BYTE_SIZE =20971520
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
            payload: userSignUp,
            failAction: async (request, h, err) => {
              // Create a custom error response with your own message
              err.output.payload.validation.keys = err.field
              throw err;
            }
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
      {
        method: 'POST',
        path: '/users/uploadPreviewProfile',
        handler: UsersController.uploadPreviewProfile,
        options: {
          payload: {
            maxBytes: MAX_BYTE_SIZE, // Set your desired maximum payload size in bytes
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
            multipart: true, // Set multipart to true for handling file uploads
          },
          auth: 'jwt',
          description: 'allow to upload preview profile picture',
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
            payload: Joi.object().keys({
              file: Joi.any()
            })
          }
        },
      }
    ]);
  }
};