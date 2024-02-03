const AuthWithSpotify = require('../../../../../lib/application/use_cases/user/AuthWithSpotify')
const catchError = require("../utils/catchError")
const mockUserRepository = {}
const mockSpotifyRepository = {}
const mockAccessTokenManager = {}
const serviceLocator = {
    userRepository: mockUserRepository,
    spotifyRepository: mockSpotifyRepository,
    accessTokenManager: mockAccessTokenManager
}
describe('AuthWithSpotifyTest', () =>{
    const mockSpotifyCode = 'code'
    const email = "some@mail"
    const display_name = "name"
    const access_token = 'access_token'
    const refresh_token = 'refresh_token'
    const images = ["https://i.ytimg.com/vi/uLHdmBf1lvs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAmH-kUIb43CviOetK-ZjGl0AnSog"]
    afterEach(()=>{
        jest.clearAllMocks();
    })
    beforeEach(() => {
        mockUserRepository.updateUser = jest.fn(() => "ok")
    })
    it("should throw error 400", async ()=>{
        mockSpotifyRepository.getToken = jest.fn(()=> {
            return {error: 'some error'}
        })
        const error = await catchError(async () =>{
            await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        })
        expect(error.code).toBe(400)

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
        const error = await catchError(async () =>{
            await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        })
        expect(error.code).toBe(403)
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
        mockAccessTokenManager.generate = jest.fn(() => 'expected_token')
        const error = await catchError(async () =>{
            await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        })
        expect(error.code).toBe(403)
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
                refresh_token: 'something'
            }
        })
        mockAccessTokenManager.generate = jest.fn(() => 'expected_token')
        const result =  await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        expect(result.email).toBe(email)
        expect(result.token).toBe("expected_token")
        expect(mockAccessTokenManager.generate).toHaveBeenCalled()
    })
    it("should return confirm token 1", async ()=>{
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
            return null
        })
        mockUserRepository.persist = jest.fn(() => 'ok')
        const result =  await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        expect(result.confirmToken).not.toBeNull()
        expect(mockUserRepository.persist).toHaveBeenCalled()
    })
    it("should return confirm token 2", async ()=>{
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
                confirmed: false,
                confirm_token: "expected_token",
                refresh_token: "something"
            }
        })
        mockUserRepository.persist = jest.fn(() => 'ok')
        const result =  await AuthWithSpotify(mockSpotifyCode,serviceLocator)
        expect(result.confirmToken).toBe("expected_token")
        expect(mockUserRepository.persist).not.toHaveBeenCalled()
    })

})