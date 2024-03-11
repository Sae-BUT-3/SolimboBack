'use strict';
const Hapi = require('@hapi/hapi');
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
const jwt = require('jsonwebtoken');

require('dotenv').config()
let server
const mockReviewRepository = {}
const mockAccesTokenManager = {}
const mockUserRepository = {}
const mockSpotifyRepository = {}
const mockFollowRepository = {}

mockAccesTokenManager.generate = ((test) =>{return ''})
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
            reviewRepository: mockReviewRepository,
            accessTokenManager: mockAccesTokenManager,
            userRepository: mockUserRepository,
            spotifyRepository: mockSpotifyRepository,
            followRepository: mockFollowRepository,
        }
        server.register(Jwt)
        server.auth.strategy('jwt', 'jwt', strategy({userRepository: mockUserRepository}));
        await server.register([
            require('../../lib/interfaces/routes/artist'),
        ]);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await server.stop();
    });
    const {
        mockUser,
        mockArtist,
        mockUserPrivate,
        mockAlbumRaw,
        mockLikedReview,
        mockCommentedReview,
        mockOeuvreReviewSpotify,
    } = require('./fixture/artist/getArtistFixture')
    describe("GET review route", ()=>{
        
        it("should return status code 200", async () => {
            
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => mockUser)
            mockFollowRepository.getFollowersCount = jest.fn((artistId) => 100)
            mockFollowRepository.getFriendsFollowing = jest.fn((artistId,userId,limit) => [mockUserPrivate])
            mockFollowRepository.getFriendsFollowingCount = jest.fn((artistId,userId) => 1)
            mockSpotifyRepository.getSpotifyArtist = jest.fn((artistId) => mockArtist)
            mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((artistId,filter,limit) => mockAlbumRaw)
            mockReviewRepository.getOeuvreRating = jest.fn((id) => 1)
            mockReviewRepository.getReviewCount = jest.fn((id) => 2)
            mockReviewRepository.getOeuvreReviews = jest.fn().mockReturnValueOnce([mockLikedReview]).mockReturnValueOnce([mockCommentedReview])
            mockReviewRepository.doesUserLike = jest.fn().mockReturnValue(true)
            mockFollowRepository.doesFollows = jest.fn().mockReturnValue(true)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockOeuvreReviewSpotify)
            const res1 = await server.inject({
                method: 'GET',
                url: `/artist/test`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(200);
            
        })
        it("should return status code 401", async () => {
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => null)
            const res1 = await server.inject({
                method: 'GET',
                url: `/artist/test`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(401);
            
        })
        it("should return status code 400", async () => {
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => mockUser)
            mockSpotifyRepository.getSpotifyArtist  = jest.fn((artistId) => {
                return {
                    error: {
                        status: 400,
                        message: "message",
                    }
                }
            })
            const res1 = await server.inject({
                method: 'GET',
                url: `/artist/test`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(400);
            
        })

    }) 
 

});
