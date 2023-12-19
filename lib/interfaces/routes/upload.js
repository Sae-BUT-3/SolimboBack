'use strict';
const {userSignUp, userSignIn} = require('../../domain/entity/UserEntity')
const UploadController = require('../controllers/UploadController');

module.exports = {
    name: 'upload',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/upload/{filename}',
                handler: UploadController.getImage,
                options: {
                    description: 'Create a static image',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: {description : 'Success'},
                                204: {description : 'No content'},
                            }
                        }
                    },
                },
            },
        ]);
    }
};