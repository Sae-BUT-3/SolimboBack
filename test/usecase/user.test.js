
const createUser = require('../../lib/application/use_cases/user/CreateUser')
const UserRepository = require('../../lib/infrastructure/repositories/interfaces/UserRepository');
const mockUserRepository = new UserRepository();
const User = require('../../lib/domain/model/User')
describe('userSignUp', () =>{
    it("should create an user", async  () =>{
        const persistedUser = new User(
            1,
            'testPeudo',
            'testEmail@gmail.com',
            'test_alias',
            'testbio',
            'passwordtest',
            'spotifyToken',
            2,
            1)
        mockUserRepository.persist = jest.fn(() => persistedUser)

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
        expect(mockResult.id_etat).toBe(1)
        expect(mockResult.password).not.toBe(user.password)
    } )


})