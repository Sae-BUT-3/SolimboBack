const CommentController = require("../controllers/CommentController");
const {
    getCommentParams,
    deleteCommentParams,
    likeCommentParams,
    putCommentPayload,
    putCommentParams,
} = require("../../domain/entity/CommentEntity");
module.exports = {
    name: 'comment',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'GET',
                path: '/comment/{id}',
                handler: CommentController.get,
                options: {
                    description: 'get a comment',
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
                        payload: getCommentParams
                    }
                },
            },
            {
                method: 'DELETE',
                path: '/comment/{id}',
                handler: CommentController.delete,
                options: {
                    auth: 'jwt',
                    description: 'delete a comment',
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
                        payload: deleteCommentParams
                    }
                },
            },
            {
                method: 'POST',
                path: '/comment/{id}/like',
                handler: CommentController.like,
                options: {
                    auth: 'jwt',
                    description: 'like a comment',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: {description: 'Success'},
                                204: {description: 'No content'},
                                401: {description: 'Unauthorized'},
                                403: {description: 'forbidden'},
                                404: {description: 'Ressource not found'},
                                500: {description: 'Internal server error'},
                                502: {description: 'bad gateway'},
                                503: {description: 'Service unavailable'},
                            }
                        }
                    },
                    validate: {
                        params: likeCommentParams,
                    }
                }
            },
            {
                method: 'PUT',
                path: '/comment/{id}',
                handler: CommentController.put,
                options: {
                    auth: 'jwt',
                    description: 'get review list',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: {description: 'Success'},
                                204: {description: 'No content'},
                                401: {description: 'Unauthorized'},
                                403: {description: 'forbidden'},
                                404: {description: 'Ressource not found'},
                                500: {description: 'Internal server error'},
                                502: {description: 'bad gateway'},
                                503: {description: 'Service unavailable'},
                            }
                        }
                    },
                    validate: {
                        payload: putCommentPayload,
                        params: putCommentParams,
                    }
                }
            },
        ])
    }
};