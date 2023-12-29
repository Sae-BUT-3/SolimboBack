const UserRepository = require('../../../../../lib/infrastructure/repositories/interfaces/UserRepositoryAbstract');
const getAccessToken =  require('../../../../../lib/application/use_cases/security/GetAccessToken')
const bcrypt = require("bcrypt");
const catchError = require("../utils/catchError")



describe('getAccessToken', () =>{
    it('should generate access token', async () =>{
        const passwordTest = 'passwordTest'
        const persistedUserCrypted = {
            id_utilisateur:"id",
            pseudo:"pseudo",
            email:"email",
            alias:"alias",
            bio:"bio",
            photo:"path/to/file",
            photo_temporaire:"path/to/file",
            password:await bcrypt.hash(passwordTest,10),
            token:"token",
            id_role:1,
            ban_until:new Date("10-06-2003"),
        }
        const mockUserRepository = new UserRepository();
        const mockAccessTokenManager = {};
        mockAccessTokenManager.generate = jest.fn((uid) => 1)
        mockUserRepository.getByIdent = jest.fn((ident) => persistedUserCrypted)
        expect(
            await getAccessToken(
                persistedUserCrypted.pseudo,
                passwordTest,
                {
                    userRepository : mockUserRepository,
                    accessTokenManager: mockAccessTokenManager
                }
            )
        ).toBe(1)
    })


    it('should throw an error because the password is incorrect', async () =>{
        const passwordTest = 'passwordTest'
        const persistedUserCrypted = {
            id_utilisateur:"id",
            pseudo:"pseudo",
            email:"email",
            alias:"alias",
            bio:"bio",
            photo:"path/to/file",
            photo_temporaire:"path/to/file",
            password:await bcrypt.hash(passwordTest,10),
            token:"token",
            id_role:1,
            ban_until:new Date("10-06-2003"),
        }
        const mockUserRepository = new UserRepository();
        const mockAccessTokenManager = {};
        mockUserRepository.getByIdent = jest.fn((ident) => persistedUserCrypted)
        const error = await catchError(async ()=>{
            await getAccessToken(
                persistedUserCrypted.pseudo,
                'badPassword',
                {
                    userRepository : mockUserRepository,
                    accessTokenManager: mockAccessTokenManager
                }
            )
        })

        expect(error.code).toBe(401)
    })

    it('should throw an error because the user doesnt exists', async () =>{
        const mockUserRepository = new UserRepository();
        const mockAccessTokenManager = {};
        mockUserRepository.getByIdent = jest.fn((ident) => null)
        const error = await catchError(async ()=> {
            await getAccessToken(
                '',
                '',
                {
                    userRepository: mockUserRepository,
                    accessTokenManager: mockAccessTokenManager
                })
            }
        )
        console.log(error)
        expect(error.code).toBe(401)
    })
})