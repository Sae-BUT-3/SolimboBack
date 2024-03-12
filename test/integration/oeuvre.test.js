'use strict';
const Hapi = require('@hapi/hapi');
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
const jwt = require('jsonwebtoken');

require('dotenv').config()
let server
const mockUserRepository = {}
const mockLikeOeuvreRepository = {}
const mockAccessTokenManager = {}
const mockSpotifyRepository = {}

mockAccessTokenManager.generate = ((test) =>{return ''})
const mockToken = jwt.sign({
    sub: 'my-sub', 
    value: 1, 
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test', 
    expiresIn: '365d'
}, process.env.SECRET_ENCODER)

describe('artist route', () => {

    beforeEach(async () => {
        
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            likeOeuvreRepository: mockLikeOeuvreRepository,
            accessTokenManager: mockAccessTokenManager,
            spotifyRepository: mockSpotifyRepository
        }
        server.register(Jwt)
        server.auth.strategy('jwt', 'jwt', strategy({userRepository: mockUserRepository}));
        await server.register([
            require('../../lib/interfaces/routes/oeuvre'),
        ]);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await server.stop();
    });
    describe("POST oeuvre/{type}/{id}/like route", ()=>{
        const mockUser = {
            id_utilisateur: 1,
            pseudo: "John Doe",
            alias: "John",
            ban_until: null,
            email: "testemail@gmail",
            id_role: 1,
            photo: null,
            photo_temporaire: null,
            type: "user",
            is_private: false
        }
        const mockArtist = {
            external_urls: { spotify: 'https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN' },
            genres: [ 'french hip hop', 'old school rap francais', 'rap conscient' ],
            id: '4FpJcNgOvIpSBeJgRg3OfN',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb32086a424e6f1e499e347cde',
                width: 640
              },
            ],
            name: 'Orelsan',
            popularity: 64,
            type: 'artist',
        }
        const errror = {
            error: {
                status: 400,
                message: "message",
            }
        }
        it("should return status code 200", async () => {
            
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(mockUser)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockArtist)
            mockLikeOeuvreRepository.doesUserLikes = jest.fn().mockReturnValue(false)
            mockLikeOeuvreRepository.like = jest.fn()
            const res1 = await server.inject({
                method: 'POST',
                url: `/oeuvre/artist/4FpJcNgOvIpSBeJgRg3OfN/like`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(200);
            
        })
        it("should return status code 401", async () => {
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(null)
            const res1 = await server.inject({
                method: 'POST',
                url: `/oeuvre/artist/4FpJcNgOvIpSBeJgRg3OfN/like`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(401);
            
        })
        it("should return status code 400", async () => {
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(mockUser)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(errror)
            const res1 = await server.inject({
                method: 'POST',
                url: `/oeuvre/artist/4FpJcNgOvIpSBeJgRg3OfN/like`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(400);
            
        })

    }) 
 

});
