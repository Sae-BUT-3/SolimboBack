'use strict';
const {
  userSignUp,
  userSignIn,
  uploadPreview,
  createUser,
  isUser,
  getUserByConfirmToken,
  sendResetEmail,
  resetPassword,
  follow,
  authWithSpotify
} = require('../../domain/entity/UserEntity')
const UsersController = require('../controllers/UsersController');
const MAX_BYTE_SIZE =20971520
module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/users/confirmUser',
        handler: UsersController.confirmUser,
        options: {
          description: 'Confirm a user',
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
            payload: uploadPreview
          }
        },
      },
      {
        method: 'POST',
        path: '/users/createUser',
        handler: UsersController.createUser,
        options: {
          description: 'send Verification email to create account',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
              }
            }
          },
          validate: {
            payload: createUser
          }
        },
      },
      {
        method: 'POST',
        path: '/users/authWithSpotify',
        handler: UsersController.authWithSpotify,
        options: {
          description: 'send Verification email to create account',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
              }
            }
          },
          validate: {
            payload: authWithSpotify
          }
        },
      },
      {
        method: 'GET',
        path: '/users/isUser',
        handler: UsersController.isUser,
        options: {
          description: 'check if a user exists',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                500: {description : 'Internal server error'},
              }
            }
          },
          validate: {
            query: isUser
          }
        }
      },
      {
        method: 'GET',
        path: '/users/getUserByConfirmToken',
        handler: UsersController.getUserByConfirmToken,
        options: {
          description: 'get user info',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description: 'Success'},
                403: {description : 'forbidden'},
                500: {description: 'Internal server error'},
              }
            }
          },
          validate: {
            query: getUserByConfirmToken
          }
        }
      },
      {
        method: 'POST',
        path: '/users/sendResetEmail',
        handler: UsersController.sendResetEmail,
        options: {
          description: 'send reset email',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description: 'Success'},
                500: {description: 'Internal server error'},
              }
            }
          },
          validate: {
            payload: sendResetEmail
          }
        }
      },
      {
        method: 'POST',
        path: '/users/resetPassword',
        handler: UsersController.resetPassword,
        options: {
          description: 'reset user password',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description: 'Success'},
                403: {description : 'forbidden'},
                500: {description: 'Internal server error'},
              }
            }
          },
          validate: {
            payload: resetPassword
          }
        }
      },
      {
        method: 'POST',
        path: '/users/follow',
        handler: UsersController.follow,
        options: {
          auth: 'jwt',
          description: 'follow artist',
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
            payload: follow
          }
        },
      }
      {
        method: 'POST',
        path: '/users/status',
        handler: UsersController.changePrivateStatus,
        options: {
          description: 'set a user in statut private',
          tags: ['api'],
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description: 'Success'},
                403: {description : 'forbidden'},
                500: {description: 'Internal server error'},
              }
            }
          },
        }
      },
    ]);
  }
};