const ArtistController = require("../controllers/OeuvreController.js");
const {
    likeOeuvre
} = require("../../domain/entity/OeuvreEntity.js");
module.exports = {
    name: 'oeuvre',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'POST',
                path: '/oeuvre/{type}/{id}/like',
                handler: ArtistController.like,
                options: {
                    auth: 'jwt',
                    description: 'like/unlike an oeuvre',
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
                        params: likeOeuvre
                    }
                },
            },
        ]);
    }
};