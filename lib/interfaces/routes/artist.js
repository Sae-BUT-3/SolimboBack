const ArtistController = require("../controllers/ArtistController");
const {
    getArtist
} = require("../../domain/entity/ArtistEntity");
module.exports = {
    name: 'artist',
    version: '1.0.0',
    register: async (server) => {
        server.route([
            {
                method: 'GET',
                path: '/artist/{id}',
                handler: ArtistController.get,
                options: {
                    auth: 'jwt',
                    description: 'get artist information',
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
                        params: getArtist
                    }
                },
            },
        ]);
    }
};