'use strict';

const FriendsController = require('../controllers/FriendsController')
const Joi = require('joi')

module.exports = {
  name: 'amis',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/amis/follow',
        handler: FriendsController.followUser,
        options: {
          description: 'Follow a user',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
          validate: {
            payload: Joi.object().keys({
              amiIdUtilisateur: Joi.number().required(),
            })
          }
        },
      },
      {
        method: 'POST',
        path: '/amis/unfollow',
        handler:  FriendsController.unfollowUser,
        options: {
          description: 'Unfollow a user',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
          validate: {
            payload: Joi.object().keys({
              amiIdUtilisateur: Joi.number().required(),
            })
          }
        },
      },
      {
        method: 'POST',
        path: '/amis/accept',
        handler:  FriendsController.acceptRequestUser,
        options: {
          description: 'Accept a friend request',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
          validate: {
            payload: Joi.object().keys({
              amiIdUtilisateur: Joi.number().required(),
            })
          }
        },
      },
      {
        method: 'GET',
        path: '/amis/request',
        handler:  FriendsController.getListFriendsRequest,
        options: {
          description: 'Get a user\'s request friends list',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
        },
      },
      {
        method: 'GET',
        path: '/amis/list',
        handler:  FriendsController.getListFriends,
        options: {
          description: 'Get a user\'s friends list',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
        }
      },
      {
        method: 'POST',
        path: '/amis/profil',
        handler:  FriendsController.getProfilFriend,
        options: {
          description: 'Get a friend profil',
          tags: ['api'],
          auth: 'jwt',
          plugins: {
            'hapi-swagger': {
              responses: {
                200: {description : 'Success'},
                403: {description : 'forbidden'},
                500: {description : 'Internal server error'},
                502: {description : 'bad gateway'},
              }
            }
          },
          validate: {
            query: Joi.object().keys({
              amiIdUtilisateur: Joi.number().required(),
            })
          }
        }
      },
      
    ]);
  }
};