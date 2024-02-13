'use strict';
const Hapi = require('@hapi/hapi');
const Friend = require("../../lib/domain/model/Friend")
const User = require("../../lib/domain/model/User")
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
const jwt = require('jsonwebtoken');
require('dotenv').config()
let server
const mockUserRepository = {}
const mockFriendRepository = {}
const mockMailRepository = {}
const mockAccesTokenManager = {}

mockAccesTokenManager.generate = ((test) =>{return ''})
const mockToken = jwt.sign({
    sub: 'my-sub', 
    value: 1, 
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test', 
    expiresIn: '365d'
}, process.env.SECRET_ENCODER)

describe('friend route', () => {

    beforeEach(async () => {
        
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            friendRepository: mockFriendRepository,
            mailRepository: mockMailRepository,
            accessTokenManager:mockAccesTokenManager
        }
        server.register(Jwt)
        server.auth.strategy('jwt', 'jwt', strategy({userRepository: mockUserRepository}));
        await server.register([
            require('../../lib/interfaces/routes/friends'),
        ]);
    });

    afterEach(async () => {
        jest.clearAllMocks();
        await server.stop();
    });

    describe("/amis/follow", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.persist = jest.fn((test) => {
                return test
            })
            mockMailRepository.send = jest.fn(option => null)
            mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
        
        })
        it('should respond code 200 with token user', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {                   
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.persist).toHaveBeenCalledTimes(1)
            expect(mockMailRepository.send).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                if(id > 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {                  
                    amiIdUtilisateur: -2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.persist).toHaveBeenCalledTimes(0)
            expect(mockMailRepository.send).toHaveBeenCalledTimes(0)
        });
        it('should respond code 403 with already existing frindship', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.persist = jest.fn((f)=> null)
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.persist).toHaveBeenCalledTimes(1)
            expect(mockMailRepository.send).toHaveBeenCalledTimes(0)
        });

    })

    describe("/amis/unfollow", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.removeFriendById = jest.fn((id, id_ami) => {
                return new Friend({id_utilisateur:id, amiIdUtilisateur:id_ami, en_attente:true})
            })
            mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})

        })  
       
        it('should respond code 200 with token user', async () => {

            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1);
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id > 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {                  
                    amiIdUtilisateur: -2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(0)
        });
        it('should respond code 403 with frindship doesn\'t exist', async () => {
            mockFriendRepository.removeFriendById = jest.fn((f)=> null)
            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {
                    amiIdUtilisateur: 3
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(1)
        });

    })

    describe("/amis/accept", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.accept = jest.fn((id, id_ami) => {
                return new Friend({id_utilisateur:id, amiIdUtilisateur:id_ami, en_attente:true})
            })
            mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
        })
        
        it('should respond code 200 with token user and friend', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {                   
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id > 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    amiIdUtilisateur: -2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(0)
        });
        it('should respond code 403 with frindship doesn\'t exist', async () => {
            mockFriendRepository.accept = jest.fn((f)=> null)
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(1)
        });

    })

    describe("/amis/profil", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
             mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.getById = jest.fn((id, id_ami) => {
                return new Friend({amiIdUtilisateur:id_ami, id_utilisateur:id, en_attente: false})
            })
            mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
        });

        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id > 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/profil',
                payload: {
                    amiIdUtilisateur: 2
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(0)
        });

        it('should respond code 403 with frindship doesn\'t exist', async () => {
            mockFriendRepository.getById = jest.fn((id, id_ami)=> {
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/profil',
                payload: {
                    amiIdUtilisateur: 3
                },
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(1)
        });

    })

    describe("/amis/list", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
    
        mockUserRepository.getByUser = jest.fn((id)=> {
            return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
        })
        mockFriendRepository.getListFriendsById = jest.fn((id) => {
            return [
                new User({pseudo:"test", id_utilisateur:1, email: "test@gmail.com", alias: "testt", is_private: true}),
                new User({pseudo:"test2", id_utilisateur:2, email: "test2@gmail.com", alias: "testt2", is_private: false})
            ]
        })
        mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
        
        it('should respond code 200 with token user', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/amis/list',
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getListFriendsById).toHaveBeenCalledTimes(1)
        });
    })

    describe("/amis/request", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach( async ()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.getRequestFriendsById = jest.fn((id) => {
                return [
                    new User({pseudo:"test", id_utilisateur:2, email: "test@gmail.com", alias: "testt", is_private: true}),
                    new User({pseudo:"test2", id_utilisateur:3, email: "test2@gmail.com", alias: "testt2", is_private: true})
                ]
            })
            mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
        })
        
        it('should respond code 200 with token user', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/amis/request',
                headers: {
                    Authorization: `Bearer ${mockToken}`
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getRequestFriendsById).toHaveBeenCalledTimes(1)
        });
    })
});
