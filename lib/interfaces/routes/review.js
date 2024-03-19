const ReviewController = require("../controllers/ReviewController");
const {
    putReview,
    deleteReview,
    getReviews,
    getReviewParams,
    getReviewQuery,
    likeReviewParams,
    likeReviewQuery,
    userReviewParams,
    userReviewQuery,
    putCommentParams,
    putCommentPayload
} = require("../../domain/entity/ReviewEntity");
module.exports = {
    name: 'review',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'PUT',
                path: '/review',
                handler: ReviewController.putReview,
                options: {
                    auth: 'jwt',
                    description: 'create a review',
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
                path: '/review',
                handler: ReviewController.deleteReview,
                options: {
                    auth: 'jwt',
                    description: 'delete a review',
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
                path: '/review/{id}',
                handler: ReviewController.getReview,
                options: {
                    description: 'get a review',
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
                        params: getReviewParams,
                        query: getReviewQuery
                    }
                }
            },
            {
                method: 'GET',
                path: '/reviews',
                handler: ReviewController.getReviews,
                options: {
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
                        query: getReviews
                    }
                }
            },
            {
                method: 'POST',
                path: '/review/{id}/like',
                handler: ReviewController.likeReview,
                options: {
                    auth: "jwt",
                    description: 'like a review',
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
                        params: likeReviewParams
                    }
                }
            },
            {
                method: 'GET',
                path: '/review/{id}/likes',
                handler: ReviewController.getLikes,
                options: {
                    description: 'get review\' likes',
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
                        params: likeReviewParams,
                        query: likeReviewQuery
                    }
                }
            },
            {
                method: 'GET',
                path: '/reviews/user/{id}',
                handler: ReviewController.getUserReviews,
                options: {
                    description: 'get review\' likes',
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
                        params: userReviewParams,
                        query: userReviewQuery
                    }
                }
            },
            {
                method: 'PUT',
                path: '/review/{id}/comment',
                handler: ReviewController.putComment,
                options: {
                    auth: 'jwt',
                    description: 'put a comment',
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
                        params: putCommentParams,
                        payload: putCommentPayload
                    }
                }
            }
        ]);
    }
};