'use strict';
const Hapi = require('@hapi/hapi');
const User = require("../../lib/domain/model/User")
const bcrypt = require("bcrypt");
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
let server
const mockUserRepository = {}
const mockAccesTokenManager = {}
const mockSpotifyRepository = {}
const mockMailRepository = {}
const mockDocumentRepository = {}
const mockFollowRepository = {}
const mockToken = jwt.sign({
    sub: 'my-sub', // needs to match definition above
    value: 1, // this is a custom key I used, it could be named anything. Value should be a way to authenticate the user
    aud: 'urn:audience:test', // needs to match definition above
    iss: 'urn:issuer:test', // needs to match definition above,
    expiresIn: '365d'
}, process.env.SECRET_ENCODER)

mockAccesTokenManager.generate = ((test) =>{return ''})
describe('user route', () => {

    beforeEach(async () => {

        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            accessTokenManager:mockAccesTokenManager,
            spotifyRepository: mockSpotifyRepository,
            mailRepository: mockMailRepository,
            documentRepository: mockDocumentRepository,
            followRepository: mockFollowRepository,

        }
        server.register(Jwt)
        server.auth.strategy('jwt', 'jwt', strategy({userRepository: mockUserRepository}));
        await server.register([
            require('../../lib/interfaces/routes/users'),
        ]);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await server.stop();
    });
    describe("/users/createUser", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> null)
        mockUserRepository.persist = jest.fn((test) => {
            return {id_utilisateur: 1}
        })
        mockMailRepository.send = jest.fn(option => null)
        mockSpotifyRepository.getToken= jest.fn(()=> {
            return {access_token: 1, refresh_token: 1}
        })
        it('should respond code 200 with email inscription', async () => {

            const res = await server.inject({
                method: 'POST',
                url: '/users/createUser',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    password: "somepassword"
                }
            });
            expect(res.statusCode).toBe(200);
        });

        it('should respond code 403 with already existing email', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> 'something')
            const res = await server.inject({
                method: 'POST',
                url: '/users/createUser',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    password: "somepassword"
                }
            });
            expect(res.statusCode).toBe(403);
        });

    })
    describe("/users/confirmUser", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })

        mockUserRepository.getByConfirmToken = jest.fn(()=> {
            return {
                id_utilisateur:1,
                photo_temporaire: "path"
            }
        })
        mockUserRepository.updateUser= jest.fn(user => user)
        mockUserRepository.persist = jest.fn((test) => {
            return {id_utilisateur: 1}
        })
        mockDocumentRepository.deleteFile= jest.fn(()=> null)
        it('should respond code 200 with confirmation and photo', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> null)
            const payload = {
                pseudo: "testPseudo",
                alias: "testAlias",
                confirmToken: "token",
                photo:"path",
                bio:"bio"
            }
            const res = await server.inject({
                method: 'POST',
                url: '/users/confirmUser',
                payload: payload
            });
            expect(res.statusCode).toBe(200);
            expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(1)
        });
        it('should respond code 200 with confirmation', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> null)
            const payload = {
                pseudo: "testPseudo",
                alias: "testAlias",
                confirmToken: "token",
                bio:"bio"
            }
            const res = await server.inject({
                method: 'POST',
                url: '/users/confirmUser',
                payload: payload
            });
            expect(res.statusCode).toBe(200);
            expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(0)
        });
        it('should respond code 400', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> null)
            mockUserRepository.getByConfirmToken = jest.fn(()=>null)
            const payload = {
                pseudo: "testPseudo",
                alias: "testAlias",
                confirmToken: "token",
                bio:"bio"
            }
            const res = await server.inject({
                method: 'POST',
                url: '/users/confirmUser',
                payload: payload
            });
            expect(res.statusCode).toBe(400);
        });
        it('should respond code 403', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>'someting')
            const payload = {
                pseudo: "testPseudo",
                alias: "testAlias",
                confirmToken: "token",
                bio:"bio"
            }
            const res = await server.inject({
                method: 'POST',
                url: '/users/confirmUser',
                payload: payload
            });
            expect(res.statusCode).toBe(403);
        });
    })
    describe("/users/signin", ()=> {
        afterEach(()=>{
            jest.clearAllMocks();
        })
        mockUserRepository.getByUser = jest.fn((test) => {
            return 1
        })
        mockAccesTokenManager.generate = ((test) =>{return ''})
        it('should respond code 200', async () => {
            const password = 'password'
            const mockUserRaw = {
                id_utilisateur:"id",
                pseudo:"pseudo",
                email:"email",
                alias:"alias",
                bio:"bio",
                photo:"path/to/file",
                photo_temporaire:"path/to/file",
                password:await bcrypt.hash(password,10),
                token:"token",
                id_role:1,
                ban_until:new Date("10-06-2003"),
            }
            const fetchedUser = new User(mockUserRaw)

            mockUserRepository.getByIdent = jest.fn((ident) =>{
                return fetchedUser
            })

            const res = await server.inject({
                method: 'POST',
                url: '/users/signin',
                payload: {
                    email:"tesddesqt@gmaiL.com",
                    password: password,
                }}
            )

            expect(res.statusCode).toBe(200);

        })
        it('should respond code 401 bad password', async () => {
            const password = 'password'
            const mockUserRaw = {
                id_utilisateur:"id",
                pseudo:"pseudo",
                email:"email",
                alias:"alias",
                bio:"bio",
                photo:"path/to/file",
                photo_temporaire:"path/to/file",
                password:await bcrypt.hash(password,10),
                token:"token",
                id_role:1,
                ban_until:new Date("10-06-2003"),
            }
            const fetchedUser = new User(mockUserRaw)

            mockUserRepository.getByIdent = jest.fn((ident) =>{
                return fetchedUser
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/signin',
                payload: {
                    email:"tesddesqt@gmaiL.com",
                    password: "aaaaadaaaaaa",
                }}
            )
            expect(res.statusCode).toBe(401);
        })
        it('should respond code 400 user not found', async () => {
            mockUserRepository.getByIdent = jest.fn((ident) =>{
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/signin',
                payload: {
                    email:"fezfez",
                    password: "aaaaadaaaaaa",
                }}
            )
            expect(res.statusCode).toBe(401);
        })
        it('should respond code 400 invalid email', async () => {

            const res = await server.inject({
                method: 'POST',
                url: '/users/signin',
                payload: {
                    email:"fezfez",
                    password: "a".repeat(31),
                }}
            )
            expect(res.statusCode).toBe(400);
        })
        it('should respond code 400 invalid password', async () => {

            const res = await server.inject({
                method: 'POST',
                url: '/users/signin',
                payload: {
                    email:"a".repeat(41),
                    password: "dzadzaa",
                }}
            )
            expect(res.statusCode).toBe(400);
        })
    })
    describe("/users/isUser", ()=> {
        afterEach(()=>{
            jest.clearAllMocks();
        })
        it('should return true', async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{
                return {id_utilisateur:1}
            })
            const res = await server.inject({
                method: 'GET',
                url: '/users/isUser?pseudo=test'
            })
            expect(res.statusCode).toBe(200);
            expect(res.result.isUser).toBe(true)
        })
        it('should return false', async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/users/isUser?pseudo=test'
            })
            expect(res.statusCode).toBe(200);
            expect(res.result.isUser).toBe(false)
        })
    })
    describe("/users/getUserByConfirmToken", ()=> {
        it('should return valid code 200', async ()=>{
            mockUserRepository.getUserByConfirmToken = jest.fn(()=>{
                return {id_utilisateur:1}
            })
            const res = await server.inject({
                method: 'GET',
                url: '/users/getUserByConfirmToken?confirmToken=test'
            })
            expect(res.statusCode).toBe(200);
        })
        it('should return invalid code 403', async ()=>{
            mockUserRepository.getUserByConfirmToken = jest.fn(()=>{
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/users/getUserByConfirmToken?confirmToken=test'
            })
            expect(res.statusCode).toBe(403);
        })
    })
    describe("/users/sendResetEmail", ()=>{
        it("should return valid code 200",async ()=>{
            mockMailRepository.send = jest.fn(()=>{})
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return {reset_token: 1,confirmed: true}})
            mockUserRepository.updateUser = jest.fn(()=>{})
            const res = await server.inject({
                method: 'POST',
                url: '/users/sendResetEmail',
                payload: {
                    email:"chanon.mael@gmail.com",
                }}
            )
            expect(res.statusCode).toBe(200);
            expect(mockMailRepository.send).toHaveBeenCalledTimes(1)
        })
        it("should return valid code 200 even though the user is not confirmed",async ()=>{
            mockMailRepository.send = jest.fn(()=>{})
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return {reset_token: 1,confirmed:false}})
            mockUserRepository.updateUser = jest.fn(()=>{})
            const res = await server.inject({
                method: 'POST',
                url: '/users/sendResetEmail',
                payload: {
                    email:"chanon.mael@gmail.com",
                }}
            )
            expect(res.statusCode).toBe(200);
            expect(mockMailRepository.send).toHaveBeenCalledTimes(0)
        })
        it("should return valid code 200 even though the user doesn't exists",async ()=>{
            mockMailRepository.send = jest.fn(()=>{})
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return null})
            mockUserRepository.updateUser = jest.fn(()=>{})
            const res = await server.inject({
                method: 'POST',
                url: '/users/sendResetEmail',
                payload: {
                    email:"chanon.mael@gmail.com",
                }}
            )
            expect(res.statusCode).toBe(200);
            expect(mockMailRepository.send).toHaveBeenCalledTimes(0)
        })
    })
    describe("/users/resetPassword", ()=>{
        it("should return valid code 200",async ()=>{
            mockUserRepository.getByResetToken = jest.fn(()=>{return {id:1}})
            mockUserRepository.updateUser = jest.fn(()=>{})
            const res = await server.inject({
                method: 'POST',
                url: '/users/resetPassword',
                payload: {
                    resetToken: "eztgergrehre",
                    password:"TestPassword",
                }}
            )
            expect(res.statusCode).toBe(200);
        })
        it("should return valid code 400 error on token",async ()=>{
            mockUserRepository.getByResetToken = jest.fn(()=> null)
            mockUserRepository.updateUser = jest.fn(()=>{})
            const res = await server.inject({
                method: 'POST',
                url: '/users/resetPassword',
                payload: {
                    resetToken: "eztgergrehre",
                    password:"TestPassword",
                }}
            )
            expect(res.statusCode).toBe(400);
        })
    })
    describe("/users/follow", ()=>{

        it("should return valid code 200",async ()=>{
            mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
            mockUserRepository.getByUser = jest.fn(() => "something")
            mockSpotifyRepository.getSpotifyArtist = jest.fn(()=>"something")
            mockFollowRepository.doesFollows = jest.fn(()=> true)
            mockFollowRepository.follow = jest.fn(()=> {})
            mockFollowRepository.unfollow = jest.fn(()=> {})
            const res = await server.inject({
                method: 'POST',
                url: '/users/follow',
                payload: {
                    artistId: "eztgergrehre",
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            })
            expect(res.statusCode).toBe(200);
        })
        it("should return error code 401",async ()=>{
            mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
            mockUserRepository.getByUser = jest.fn(() => null)

            const res = await server.inject({
                method: 'POST',
                url: '/users/follow',
                payload: {
                    artistId: "eztgergrehre",
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            })
            expect(res.statusCode).toBe(401);
        })
        it("should return return invalid code 415",async ()=>{
            mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
            mockUserRepository.getByUser = jest.fn(() => "something")
            mockSpotifyRepository.getSpotifyArtist = jest.fn(()=>{
                return {
                    error: {
                        status:415,
                        message: "message"
                    }
                }
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/follow',
                payload: {
                    artistId: "eztgergrehre",
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            })
            expect(res.statusCode).toBe(415);
        })
    })
    describe('AuthWithSpotifyTest', () =>{
        const mockSpotifyCode = 'code'
        const email = "some@mail"
        const display_name = "name"
        const access_token = 'access_token'
        const refresh_token = 'refresh_token'
        const images = ["https://i.ytimg.com/vi/uLHdmBf1lvs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAmH-kUIb43CviOetK-ZjGl0AnSog"]
        beforeEach(() => {
            mockUserRepository.updateUser = jest.fn(() => "ok")
        })
        it("should throw error 400", async ()=>{
            mockSpotifyRepository.getToken = jest.fn(()=> {
                return {error: 'some error'}
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/authWithSpotify',
                payload: {
                    spotify_code: "eztgergrehre",
                },
            })
            expect(res.statusCode).toBe(400)

        })
        it("should throw error 403 1", async ()=>{
            mockSpotifyRepository.getToken = jest.fn(()=> {
                return {
                    access_token,
                    refresh_token
                }
            })
            mockSpotifyRepository.getAccountData = jest.fn(()=> {
                return {email,display_name,images}
            })
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=> {
                return {
                    confirmed: false
                }
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/authWithSpotify',
                payload: {
                    spotify_code: "eztgergrehre",
                    callback: "callback"
                },
            })
            expect(res.statusCode).toBe(403)
        })
        it("should throw error 403 2", async ()=>{
            mockSpotifyRepository.getToken = jest.fn(()=> {
                return {
                    access_token,
                    refresh_token
                }
            })
            mockSpotifyRepository.getAccountData = jest.fn(()=> {
                return {email,display_name,images}
            })
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=> {
                return {
                    confirmed: true,
                }
            })
            mockAccesTokenManager.generate = jest.fn(() => 'expected_token')
            const res = await server.inject({
                method: 'POST',
                url: '/users/authWithSpotify',
                payload: {
                    spotify_code: "eztgergrehre",
                    callback: "callback"
                },
            })
            expect(res.statusCode).toBe(403)
        })
        it("should return auth token", async ()=>{
            mockSpotifyRepository.getToken = jest.fn(()=> {
                return {
                    access_token,
                    refresh_token
                }
            })
            mockSpotifyRepository.getAccountData = jest.fn(()=> {
                return {email,display_name,images}
            })
            mockUserRepository.getByEmailOrPseudo = jest.fn(()=> {
                return {
                    confirmed: true,
                    refresh_token: 'someting'
                }
            })
            mockAccesTokenManager.generate = jest.fn(() => 'expected_token')
            const res = await server.inject({
                method: 'POST',
                url: '/users/authWithSpotify',
                payload: {
                    spotify_code: "eztgergrehre",
                    callback: "callback"
                },
            })
            expect(res.statusCode).toBe(200)

        })
    })
});
