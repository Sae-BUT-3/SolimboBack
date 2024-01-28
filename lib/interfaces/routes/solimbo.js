const SolimboController = require("../controllers/SolimboController");
const {
    putReview,
    deleteReview,
    getReview,
    getReviews
} = require("../../domain/entity/SolimboEntity");
module.exports = {
    name: 'solimbo',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'PUT',
                path: '/solimbo/review',
                handler: SolimboController.putReview,
                options: {
                    auth: 'jwt',
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
                        payload: putReview
                    }
                },
            },
            {
                method: 'DELETE',
                path: '/solimbo/review',
                handler: SolimboController.deleteReview,
                options: {
                    auth: 'jwt',
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
                        payload: deleteReview
                    }
                },
            },
            {
                method: 'GET',
                path: '/solimbo/review',
                handler: SolimboController.getReview,
                options: {
                    description: 'Get connexion autorization',
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
                        query: getReview
                    }
                }
            },
            {
                method: 'GET',
                path: '/solimbo/reviews',
                handler: SolimboController.getReviews,
                options: {
                    description: 'Get connexion autorization',
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
                        query: getReviews
                    }
                }
            },
            {
                method: 'POST',
                path: '/solimbo/likeReview',
                handler: SolimboController.likeReview,
                options: {
                    description: 'Get connexion autorization',
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
                }
            },
        ]);
    }
};