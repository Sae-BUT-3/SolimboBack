const follow = require("../../../../../lib/application/use_cases/user/follow")
const mockUserRepository = {}
const mockAccesTokenManager = {}
const mockSpotifyRepository = {}
const mockFollowRepository = {}
const catchError = require("../utils/catchError")
const serviceLocator = {
    userRepository: mockUserRepository,
    accessTokenManager:mockAccesTokenManager,
    spotifyRepository: mockSpotifyRepository,
    followRepository: mockFollowRepository
}
describe("follow use case", ()=>{
    it("should return false",async ()=>{
        mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
        mockUserRepository.getByUser = jest.fn(() => "something")
        mockSpotifyRepository.getSpotifyArtist = jest.fn(()=>"something")
        mockFollowRepository.doesFollows = jest.fn(()=> true)
        mockFollowRepository.follow = jest.fn(()=> {})
        mockFollowRepository.unfollow = jest.fn(()=> {})
        const result = await follow("something","something",serviceLocator)
        expect(result).toBe(false);
    })
    it("should return true",async ()=>{
        mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
        mockUserRepository.getByUser = jest.fn(() => "something")
        mockSpotifyRepository.getSpotifyArtist = jest.fn(()=>"something")
        mockFollowRepository.doesFollows = jest.fn(()=> false)
        mockFollowRepository.follow = jest.fn(()=> {})
        mockFollowRepository.unfollow = jest.fn(()=> {})
        const result = await follow("something","something",serviceLocator)
        expect(result).toBe(true);
    })
    it("should return error code 401",async ()=>{
        mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
        mockUserRepository.getByUser = jest.fn(() => null)

        const result = await catchError(async ()=>{
            await follow("something","something",serviceLocator)
        })
        expect(result.code).toBe(401);
    })
    it("should return return invalid code 415",async ()=>{
        mockAccesTokenManager.decode = jest.fn(()=>{return {id:1}})
        mockUserRepository.getByUser = jest.fn(() => "something")
        mockSpotifyRepository.getSpotifyArtist = jest.fn(()=>{
            return {
                error: {
                    status:415,
                    message: "message"
                }
            }
        })
        const result = await catchError(async ()=>{
            await follow("something","something",serviceLocator)
        })
        expect(result.code).toBe(415);
    })
})