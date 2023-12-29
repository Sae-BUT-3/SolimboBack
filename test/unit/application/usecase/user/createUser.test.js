const createUser = require('../../../../../lib/application/use_cases/user/CreateUser')
const catchError = require("../utils/catchError")
const mockUserRepository = {}
const mockSpotifyRepository = {}
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
    mockSpotifyRepository.getToken= jest.fn(()=> {
        return {access_token: 1, refresh_token: 1}
    })
    mockSpotifyRepository.getAccountData = jest.fn(()=> {
        return {
            email,
            display_name,
            image
        }
    })
    const serviceLocator = {
        userRepository: mockUserRepository,
        spotifyRepository: mockSpotifyRepository,
        mailRepository: mockMailRepository
    }
    it('should return user with email inscription', async () => {

        const user = await createUser(email,null,serviceLocator)
        expect(user.email).toBe(email)
        expect(user.confirmed).toBe(false)
        expect(mockSpotifyRepository.getToken).toHaveBeenCalledTimes(0)
        expect(mockSpotifyRepository.getAccountData).toHaveBeenCalledTimes(0)
    });
    it('should return user with spotify inscription', async () => {
        const user = await createUser(null,"code",serviceLocator)
        expect(user.email).toBe(email)
        expect(user.alias).toBe(display_name)
        expect(user.photo_temporaire).toBe('testurl')
        expect(user.token).toBe(1)
        expect(user.refresh_token).toBe(1)
        expect(user.confirmed).toBe(false)

        expect(mockSpotifyRepository.getToken).toHaveBeenCalledTimes(1)
        expect(mockSpotifyRepository.getAccountData).toHaveBeenCalledTimes(1)
    });
    it('should throw error 400 invalid code', async () => {
        mockSpotifyRepository.getToken= jest.fn(()=> {
            return {error: {}}
        })
        const error = await catchError(async ()=>{
            await createUser(null,"code",serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockSpotifyRepository.getToken).toHaveBeenCalledTimes(1)
        expect(mockSpotifyRepository.getAccountData).toHaveBeenCalledTimes(0)
    });
    it('should throw error 403 email already exists', async () => {
        mockUserRepository.getByEmailOrPseudo = jest.fn((email,pseudo)=> 'something')
        const error = await catchError(async ()=>{
            await createUser(email,null,serviceLocator)
        })
        expect(error.code).toBe(403);
        expect(mockSpotifyRepository.getToken).toHaveBeenCalledTimes(0)
        expect(mockSpotifyRepository.getAccountData).toHaveBeenCalledTimes(0)
    });
})