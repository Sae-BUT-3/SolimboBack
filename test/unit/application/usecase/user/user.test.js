
const createUser = require('../../../../../lib/application/use_cases/user/CreateUser')
const UserRepository = require('../../../../../lib/infrastructure/repositories/interfaces/UserRepositoryAbstract');
const getAccessToken =  require('../../../../../lib/application/use_cases/security/GetAccessToken')
const User = require('../../../../../lib/domain/model/User')
const bcrypt = require("bcrypt");
const {use} = require("bcrypt/promises");
const persistedUser = new User(
    1,
    'testPeudo',
    'testEmail@gmail.com',
    'test_alias',
    'testbio',
    'path/to/file',
    'path/to/file',
    'passwordtest',
    'spotifyToken',
    2,
    new Date("10-06-2003")
)


describe('createUser', () =>{
    it("should create an user", async  () =>{
        const mockUserRepository = new UserRepository();
        mockUserRepository.persist = jest.fn(() => persistedUser)
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo) => null)
        const user = await createUser(
            'testPeudo',
            'testEmail@gmail.com',
            'test_alias',
            'testbio',
            'passwordtest',
            'spotifyToken',
            {userRepository : mockUserRepository}
        )
        const mockResult = mockUserRepository.persist.mock.calls[0][0]
        expect(mockUserRepository.persist).toHaveBeenCalled()
        expect(mockResult.id).toBe(null)
        expect(mockResult.pseudo).toBe(persistedUser.pseudo)
        expect(mockResult.email).toBe(persistedUser.email)
        expect(mockResult.alias).toBe(persistedUser.alias)
        expect(mockResult.bio).toBe(persistedUser.bio)
        expect(mockResult.spotifyToken).toBe(persistedUser.spotifyToken)
        expect(mockResult.id_role).toBe(2)
        expect(mockResult.photo).toBe(null)
        expect(mockResult.tempPhoto).toBe(null)
        expect(mockResult.banUntil).toBe(null)
        expect(mockResult.password).not.toBe(user.password)
    })
    it('should throw an error when an user with the same pseudo exists', async ()=>{
        const mockUserRepository = new UserRepository();
        mockUserRepository.persist = jest.fn(() => persistedUser)
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo) => persistedUser)
         await expect(createUser(
             persistedUser.pseudo,
            '',
            '',
            '',
            '',
            '',
            {userRepository: mockUserRepository}
        )).rejects.toThrow('Email ou Pseudo déjà existant')
    })
    it('should throw an error when an user with the same email exists', async ()=>{
        const mockUserRepository = new UserRepository();
        mockUserRepository.persist = jest.fn(() => persistedUser)
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo) => persistedUser)
        await expect(createUser(
            '',
            persistedUser.email,
            '',
            '',
            '',
            '',
            {userRepository: mockUserRepository}
        )).rejects.toThrow('Email ou Pseudo déjà existant')
    })

})

describe('getAccessToken', () =>{
    it('should generate access token', async () =>{
        const passwordTest = 'passwordTest'
        const persistedUserCrypted = new User(
            1,
            'testPeudo',
            'testEmail@gmail.com',
            'test_alias',
            'testbio',
            'path/to/file',
            'path/to/file',
            await bcrypt.hash(passwordTest,10),
            'spotifyToken',
            2,
            new Date("10-06-2003"))
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
        const persistedUserCrypted = new User(
            1,
            'testPeudo',
            'testEmail@gmail.com',
            'test_alias',
            'testbio',
            'path/to/file',
            'path/to/file',
            await bcrypt.hash(passwordTest,10),
            'spotifyToken',
            2,
            new Date("10-06-2003"))
        const mockUserRepository = new UserRepository();
        const mockAccessTokenManager = {};
        mockUserRepository.getByIdent = jest.fn((ident) => persistedUserCrypted)
        await expect(
            getAccessToken(
                persistedUserCrypted.pseudo,
                'badPassword',
                {
                    userRepository : mockUserRepository,
                    accessTokenManager: mockAccessTokenManager
                }
            )
        ).rejects.toThrow('Bad credentials')
    })

    it('should throw an error because the user doesnt exists', async () =>{
        const mockUserRepository = new UserRepository();
        const mockAccessTokenManager = {};
        mockUserRepository.getByIdent = jest.fn((ident) => null)
        await expect(
            getAccessToken(
                '',
                '',
                {
                    userRepository : mockUserRepository,
                    accessTokenManager: mockAccessTokenManager
                }
            )
        ).rejects.toThrow('Bad credentials')
    })
})