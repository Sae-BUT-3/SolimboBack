const createUser = require('../../../../../lib/application/use_cases/user/CreateUser')
const catchError = require("../utils/catchError")
const mockUserRepository = {}
const mockMailRepository = {}
const email = "testemail@gmail.com"
const display_name = "display_name"
const image = [{url:"testurl"}]
describe("createUser", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })
    mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> null)
    mockUserRepository.persist = jest.fn((user) => {
        user.id_utilisateur = 1
        return user
    })
    mockMailRepository.send = jest.fn(option => null)

    const serviceLocator = {
        userRepository: mockUserRepository,
        mailRepository: mockMailRepository
    }
    it('should return user with email inscription', async () => {

        const user = await createUser(email,"password",serviceLocator)
        expect(user.email).toBe(email)
        expect(user.confirmed).toBe(false)
        !expect(user.password).not.toBe(null)
    });
    it('should throw error 403 email already exists', async () => {
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> 'something')
        const error = await catchError(async ()=>{
            await createUser(email,"password",serviceLocator)
        })
        expect(error.code).toBe(403);
    });
})