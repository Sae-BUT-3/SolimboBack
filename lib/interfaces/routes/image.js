'use strict';
const Joi = require('@hapi/joi')
const ImageController = require("../controllers/ImageController")
const MAX_BYTE_SIZE =20971520
module.exports = {
    name: 'image',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'POST',
                path: '/image/upload',
                handler: ImageController.upload,
                options: {
                    payload: {
                        maxBytes: MAX_BYTE_SIZE, // Set your desired maximum payload size in bytes
                        output: 'stream',
                        parse: true,
                        allow: 'multipart/form-data',
                        multipart: true, // Set multipart to true for handling file uploads
                    },
                    description: 'upload an image',
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
                            image: Joi.any().required(),
                        })
                    }
                },
            },
        ]);
    }
};