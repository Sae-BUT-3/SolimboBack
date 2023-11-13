'use strict';
const Hapi = require('@hapi/hapi');
const User = require("../../lib/domain/model/User")
const bcrypt = require("bcrypt");
let server
const mockUserRepository = {}
const mockAccesTokenManager = {}
mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo) => {
    return null
})
mockUserRepository.persist = jest.fn((test) =>{
    return test
})

mockAccesTokenManager.generate = ((test) =>{return ''})
describe('user route', () => {

    beforeEach(async () => {
        server = Hapi.server({
            port: process.env.PORT || 3000
        });
        await server.register([
            require('../../lib/interfaces/routes/users'),
        ]);
        server.app.serviceLocator = {
            userRepository: mockUserRepository,
            accessTokenManager:mockAccesTokenManager
        }
    });

    afterEach(async () => {
        await server.stop();
    });
    describe("/users/signup", ()=>{
        it('should respond code 200', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            expect(res.statusCode).toBe(200);
        });


        it('should respond code 403', async () => {
            mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo) => {
                return {}
            })
            const res = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            expect(res.statusCode).toBe(403);
        });

        it('should respond code 400 with invalid email', async () => {
            const res = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "te",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res.payload).validation.keys).toBe("email")
        });

        it('should respond code 400 with invalid pseudo', async () => {
            const res1 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "test@sss",
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            const res2 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "te",
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            const res3 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: 'a'.repeat(16),
                    alias: "testsss",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            expect(res1.statusCode).toBe(400);
            expect(JSON.parse(res1.payload).validation.keys).toBe("pseudo")
            expect(res2.statusCode).toBe(400);
            expect(JSON.parse(res2.payload).validation.keys).toBe("pseudo")
            expect(res3.statusCode).toBe(400);
            expect(JSON.parse(res3.payload).validation.keys).toBe("pseudo")

        });

        it('should respond code 400 with invalid alias', async () => {
            const res1 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "te",
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            const res2 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: 'a'.repeat(16),
                    password: "pdazdazassworrdddd",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });

            expect(res1.statusCode).toBe(400);
            expect(JSON.parse(res1.payload).validation.keys).toBe("alias")
            expect(res2.statusCode).toBe(400);
            expect(JSON.parse(res2.payload).validation.keys).toBe("alias")

        });

        it('should respond code 400 with invalid password', async () => {
            const res1 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "aa",
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });
            const res2 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "a".repeat(31),
                    spotifyToken: "tokeeeeen",
                    bio: "dzada"
                }
            });

            expect(res1.statusCode).toBe(400);
            expect(JSON.parse(res1.payload).validation.keys).toBe("password")
            expect(res2.statusCode).toBe(400);
            expect(JSON.parse(res2.payload).validation.keys).toBe("password")
        });

        it('should respond code 400 with invalid bio', async () => {
            const res1 = await server.inject({
                method: 'POST',
                url: '/users/signup',
                payload: {
                    email: "tesddesqt@gmaiL.com",
                    pseudo: "testsss",
                    alias: "testsss",
                    password: "aaaaaaaaaaa",
                    spotifyToken: "tokeeeeen",
                    bio: "a".repeat(1501)
                }
            });


            expect(res1.statusCode).toBe(400);
            expect(JSON.parse(res1.payload).validation.keys).toBe("bio")
        });
    })
    describe("/users/signin", ()=> {


        it('should respond code 200', async () => {
            const password = 'password'
            let fetchedUser = new User("id","pseudo","email","alias","bio",await bcrypt.hash(password,10),"token",1,1)

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
            let fetchedUser = new User("id","pseudo","email","alias","bio",await bcrypt.hash(password,10),"token",1,1)

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
});