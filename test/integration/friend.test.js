'use strict';
const Hapi = require('@hapi/hapi');
const Friend = require("../../lib/domain/model/Friend")
const User = require("../../lib/domain/model/User")
const strategy = require("../../lib/infrastructure/config/strategy");
const Jwt = require("@hapi/jwt");
require('dotenv').config()
let server
const mockUserRepository = {}
const mockFriendRepository = {}
const mockMailRepository = {}

describe('friend route', () => {

    beforeEach(async () => {
 
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            friendRepository: mockFriendRepository,
            mailRepository: mockMailRepository,
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
        
        })
        it('should respond code 200 with id user', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: 2
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.persist).toHaveBeenCalledTimes(1)
            expect(mockMailRepository.send).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {
                    id_utilisateur: -1,
                    amiIdUtilisateur: 2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.persist).toHaveBeenCalledTimes(0)
            expect(mockMailRepository.send).toHaveBeenCalledTimes(0)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                if(id < 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/follow',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: -2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
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
                    id_utilisateur: 1,
                    amiIdUtilisateur: 2
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
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
        })  
       
        it('should respond code 200 with id user', async () => {

            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: 2
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {
                    id_utilisateur: -1,
                    amiIdUtilisateur: 2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(0)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id < 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/unfollow',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: -2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(0)
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
        })
        
        it('should respond code 200 with id user and friend', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: 2
                }
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    id_utilisateur: -1,
                    amiIdUtilisateur: 2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(0)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id < 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: -2
                }
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.accept).toHaveBeenCalledTimes(0)
        });
        it('should respond code 403 with frindship doesn\'t exist', async () => {
            mockFriendRepository.accept = jest.fn((f)=> null)
            const res = await server.inject({
                method: 'POST',
                url: '/amis/accept',
                payload: {
                    id_utilisateur: 1,
                    amiIdUtilisateur: 2
                }
            });
            expect(res.statusCode).toBe(403);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
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
                return [
                    new User({pseudo:"test", id_utilisateur:1, email: "test@gmail.com", alias: "testt", is_private: true}),
                    new User({pseudo:"test2", id_utilisateur:2, email: "test2@gmail.com", alias: "testt2", is_private: false})
                ]
            })
        })

        it('should respond code 200 with id user', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/amis/profil?id_utilisateur=1&amiIdUtilisateur=2'
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/amis/profil?id_utilisateur=-1&amiIdUtilisateur=2'
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(0)
        });
        it('should respond code 400 with invalid id friend', async () => {
            mockUserRepository.getByUser= jest.fn((id)=> {
                if(id < 0) return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: false})
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/amis/profil?id_utilisateur=1&amiIdUtilisateur=-2'
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(0)
        });
        it('should respond code 403 with frindship doesn\'t exist', async () => {
            mockFriendRepository.getById = jest.fn((f)=> null)
            const res = await server.inject({
                method: 'GET',
                url: '/amis/profil?id_utilisateur=1&amiIdUtilisateur=3',
            });
            expect(res.statusCode).toBe(403);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(1)
        });

    })

    describe("/amis/list", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.getListFriendsById = jest.fn((id) => {
                return [
                    new User({pseudo:"test", id_utilisateur:1, email: "test@gmail.com", alias: "testt", is_private: true}),
                    new User({pseudo:"test2", id_utilisateur:2, email: "test2@gmail.com", alias: "testt2", is_private: false})
                ]
            })
        })

        it('should respond code 200 with id user', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/amis/list?id_utilisateur=1'
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getListFriendsById).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/amis/list?id_utilisateur=-1'
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getById).toHaveBeenCalledTimes(0)
        });
    })

    describe("/amis/request", ()=>{
        afterEach(()=>{
            jest.clearAllMocks();
        })
        beforeEach(()=>{
            mockUserRepository.getByUser = jest.fn((id)=> {
                return new User({pseudo:"test", id_utilisateur:id, email: "test@gmail.com", alias: "testt", is_private: true})
            })
            mockFriendRepository.getRequestFriendsById = jest.fn((id) => {
                return [
                    new User({pseudo:"test", id_utilisateur:2, email: "test@gmail.com", alias: "testt", is_private: true}),
                    new User({pseudo:"test2", id_utilisateur:3, email: "test2@gmail.com", alias: "testt2", is_private: true})
                ]
            })
        })
        
        it('should respond code 200 with id user', async () => {
            const res = await server.inject({
                method: 'GET',
                url: '/amis/request?id_utilisateur=1'
            });

            expect(res.statusCode).toBe(200);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getRequestFriendsById).toHaveBeenCalledTimes(1)
        });
        it('should respond code 400 with invalid id user', async () => {
            mockUserRepository.getByUser = jest.fn((id)=> {
                return null
            })
            const res = await server.inject({
                method: 'GET',
                url: '/amis/request?id_utilisateur=-1'
            });
            expect(res.statusCode).toBe(400);
            expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
            expect(mockFriendRepository.getRequestFriendsById).toHaveBeenCalledTimes(0)
        });
    })


    
    
   
   
});
