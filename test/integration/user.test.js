
const createUser = require('../../lib/application/use_cases/user/CreateUser')
const UserRepository = require('../../lib/infrastructure/repositories/UserRepositorySQLite');
const mockUserRepository = new UserRepository();
const User = require('../../lib/domain/model/User')
test('userSignUp',async () =>{
    const password = 'passwordtest'
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

    const user = createUser(
        'testPeudo',
        'testEmail@gmail.com',
        'test_alias',
        'testbio',
        'passwordtest',
        {userRepository : mockUserRepository}
    )
    expect(mockUserRepository.persist).toHaveBeenCalledWith(
        new User(

        )
    )

})