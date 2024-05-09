'use strict';
const Hapi = require('@hapi/hapi');
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
const jwt = require('jsonwebtoken');

require('dotenv').config()
let server
const mockReviewRepository = {}
const mockFriendRepository = {}
const mockAccesTokenManager = {}
const mockSpotifyRepository = {}
const mockUserRepository = {}
const mockCommentRepository = {}

mockAccesTokenManager.generate = ((test) =>{return ''})
const mockToken = jwt.sign({
    sub: 'my-sub', 
    value: 1, 
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test', 
    expiresIn: '365d'
}, process.env.SECRET_ENCODER)

describe('review route', () => {

    beforeEach(async () => {
        
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        server.app.serviceLocator = {
            reviewRepository: mockReviewRepository,
            friendRepository: mockFriendRepository,
            accessTokenManager: mockAccesTokenManager,
            spotifyRepository: mockSpotifyRepository,
            userRepository: mockUserRepository,
            commentRepository: mockCommentRepository
        }
        server.register(Jwt)
        server.auth.strategy('jwt', 'jwt', strategy({userRepository: mockUserRepository}));
        await server.register([
            require('../../lib/interfaces/routes/review'),
        ]);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await server.stop();
    });
    const {
        mockArtist,
        rawReview,
        mockComments
    } = require("./fixture/review/getReviewFixture")
    describe("GET review route", ()=>{
        
        it("should return status code 200", async () => {
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            mockReviewRepository.getById = jest.fn((id) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(200);
            
        })
        it("should return status code 404", async () => {
            mockReviewRepository.getById = jest.fn((id) => null)
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(404);
            
        })
        it("should return status code 403", async () => {
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1?page=1&pageSize=10&orderByLike=true`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
                
            });
            expect(res1.statusCode).toBe(403);
            
        })
        it("should return status code 400", async () => {
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            mockReviewRepository.getById = jest.fn((id) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => {
                return {
                    error: {
                        status: 400,
                        message: "message",
                    }
                }
            })
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1?page=1&pageSize=10&orderByLike=true`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(400);
            
        })
    }) 
    describe("GET reviews route", ()=>{
        it("should return status code 200", async ()=>{

            mockReviewRepository.getReviews = jest.fn((page,pageSize,orderByLike, isPrivate,userToken) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews?page=1&pageSize=10&orderByLike=true`,
                
            });
            expect(res1.statusCode).toBe(200);
        })
    
        it("should return status code 200 with user login", async ()=>{
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockReviewRepository.getReviews = jest.fn((page,pageSize,orderByLike, isPrivate,userToken) => [rawReview])
            mockreviewRepository.doesUserLikes = jest.fn((id_utilisateur,reviewId) => false)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews?page=1&pageSize=10&orderByLike=true`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(200);
        })
    })

    describe("DELETE review route", ()=>{
        it("should return status code 200", async ()=>{
            mockReviewRepository.delete = jest.fn((id) => true)
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            const res1 = await server.inject({
                method: 'DELETE',
                url: `/review`,
                payload: {
                    idReview: 'idReview'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
                
            });
            expect(res1.statusCode).toBe(200);
        })

        it("should return status code 401 no header", async ()=>{
            mockReviewRepository.delete = jest.fn((id) => true)
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            const res1 = await server.inject({
                method: 'DELETE',
                url: `/review`,
                payload: {
                    idReview: 'idReview'
                },
            });
            expect(res1.statusCode).toBe(401);
        })

        it("should return status code 401 bad auth token", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => null)
            const res1 = await server.inject({
                method: 'DELETE',
                url: `/review`,
                payload: {
                    idReview: 'idReview'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(401);
        })  
        it("should return status code 401 not post owner", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.delete = jest.fn((id) => false)
            const res1 = await server.inject({
                method: 'DELETE',
                url: `/review`,
                payload: {
                    idReview: 'idReview'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(403);
        }) 
    })

    describe("GET reviewLikes route", ()=>{
        const {
            mockUser,
            mockPublicUser
        } = require("./fixture/review/getReviewLikesFixture")
        it("should return status code 404", async ()=>{
            mockReviewRepository.getById = jest.fn((id) => null)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
                // headers: {
                //     Authorization: `Bearer ${mockToken}`
                // }
            });
            expect(res1.statusCode).toBe(404)
        })
        it("should return status code 403", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(403)
        })
        it("should return status code 200", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: false
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockReviewRepository.getLikes = jest.fn((id) => [mockUser])
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
            });
            expect(res1.statusCode).toBe(200)
        })
    })
    
    describe("GET userReviews route", ()=>{
        it("should return status code 200", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: false
                }
            })
            mockReviewRepository.getReviewByUserId = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews/user/{id}?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(200);
        })

        it("should return status code 403", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: true
                }
            })
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews/user/{id}?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(403);
        })

        it("should return status code 404", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn().mockReturnValue(null)
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews/user/{id}?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(404);
        })
    })

    describe("GET reviewLike route",()=>{
        it("should return status code 200", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: false
                }
            }
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
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockReviewRepository.getLikes = jest.fn((id) => [mockUser])

            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
            });
            expect(res1.statusCode).toBe(200);
        })

        it("should return status code 403", async ()=>{
            
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(403);

        })
        it("should return status code 404", async ()=>{
            
            mockReviewRepository.getById = jest.fn((id) => null)
            const res1 = await server.inject({
                method: 'GET',
                url: `/review/1/likes?page=1&pageSize=10`,
            });
            expect(res1.statusCode).toBe(404);

        })
    })

    describe("PUT review route",()=>{
        it("should return status code 200", async ()=>{
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => null)
            mockReviewRepository.getTypeReviewID = jest.fn((type) => 1)
            mockReviewRepository.persist = jest.fn((reviewRaw) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            const res1 = await server.inject({
                method: 'PUT',
                url: `/review`,
                payload: {
                    idOeuvre: 'idOeuvre',
                    description: 'description',
                    note: 5,
                    type: 'artist'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(200);
        })

        it("should return status code 400", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => null)
            mockReviewRepository.getTypeReviewID = jest.fn((type) => 1)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => {
                return {
                    error: {
                        status: 400,
                        message: 'error'
                    }
                }
            })
            const res1 = await server.inject({
                method: 'PUT',
                url: `/review`,
                payload: {
                    idOeuvre: 'idOeuvre',
                    description: 'description',
                    note: 5,
                    type: 'artist'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(400);
        })
        it("should return status code 401", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => null)
            const res1 = await server.inject({
                method: 'PUT',
                url: `/review`,
                payload: {
                    idOeuvre: 'idOeuvre',
                    description: 'description',
                    note: 5,
                    type: 'artist'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(401);
        })
        it("should return status code 403", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => {
                return {
                    id_review: 1
                }
            })
            const res1 = await server.inject({
                method: 'PUT',
                url: `/review`,
                payload: {
                    idOeuvre: 'idOeuvre',
                    description: 'description',
                    note: 5,
                    type: 'artist'
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res1.statusCode).toBe(403);
        })
    })

    describe("GET oeuvreReviews",()=>{
        const {
            mockArtist,
            rawReview,
        } = require("./fixture/review/getOeuvreReviewFixture.js")
        it("should return status code 200", async ()=>{
            mockReviewRepository.getOeuvreReviews = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews/oeuvre/{id}?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(200);
        })

        it("should return status code 400", async ()=>{
            mockReviewRepository.getOeuvreReviews = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => {
                return {
                    error: {
                        status: 400,
                        message: "message",
                    }
                }
            })
            const res1 = await server.inject({
                method: 'GET',
                url: `/reviews/oeuvre/{id}?page=1&pageSize=10&orderByLike=true`,
            });
            expect(res1.statusCode).toBe(400);
        })
 
    })
});
