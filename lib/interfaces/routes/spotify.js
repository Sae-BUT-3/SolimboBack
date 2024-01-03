const { trackBody,fetchArtist } = require("../../domain/entity/SpotifyEntity")
const spotify = require("../controllers/SpotifyController")
module.exports = {
    name: 'spotify',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/spotify/search',
                handler: spotify.search,
                options: {
                    description: 'get a spotify track',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: { description: 'Success' },
                                204: { description: 'No content' },
                                401: { description: 'Unauthorized' },
                                403: { description: 'forbidden' },
                                404: { description: 'Ressource not found' },
                                500: { description: 'Internal server error' },
                                502: { description: 'bad gateway' },
                                503: { description: 'Service unavailable' },
                            }
                        }
                    },
                    validate: {
                        query: trackBody
                    }
                },
            },
            {
                method: 'GET',
                path: '/spotify/fetchArtist',
                handler: spotify.fetchArtist,
                options: {
                    description: 'get Artist informations',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: { description: 'Success' },
                                204: { description: 'No content' },
                                401: { description: 'Unauthorized' },
                                403: { description: 'forbidden' },
                                404: { description: 'Ressource not found' },
                                500: { description: 'Internal server error' },
                                502: { description: 'bad gateway' },
                                503: { description: 'Service unavailable' },
                            }
                        }
                    },
                    validate: {
                        query: fetchArtist
                    }
                },
            },
            {
                method: 'GET',
                path: '/spotify/fetchArtistSongs',
                handler: spotify.fetchArtistSongs,
                options: {
                    description: 'get Artist Songs informations',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: { description: 'Success' },
                                204: { description: 'No content' },
                                401: { description: 'Unauthorized' },
                                403: { description: 'forbidden' },
                                404: { description: 'Ressource not found' },
                                500: { description: 'Internal server error' },
                                502: { description: 'bad gateway' },
                                503: { description: 'Service unavailable' },
                            }
                        }
                    },
                    validate: {
                        query: fetchArtistSongs
                    }
                },
            },
            {
                method: 'GET',
                path: '/spotify/getAuthURL',
                handler: spotify.getAuthURL,
                options: {
                    description: 'get auth URL',
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
                },
            }
        ]);
    }
};