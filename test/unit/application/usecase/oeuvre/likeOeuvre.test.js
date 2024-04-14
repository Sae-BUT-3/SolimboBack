const catchError = require("../utils/catchError")
const likeOeuvre = require("../../../../../lib/application/use_cases/oeuvre/likeOeuvre")
const mockUserRepository = {}
const mockLikeOeuvreRepository = {}
const mockAccessTokenManager = {}
const mockSpotifyRepository = {}

const serviceLocator = {
    userRepository: mockUserRepository,
    likeOeuvreRepository: mockLikeOeuvreRepository,
    accessTokenManager: mockAccessTokenManager,
    spotifyRepository: mockSpotifyRepository
}

describe("like oeuvre use case ", ()=>{
    const mockUser = {
        id_utilisateur: 1,
        pseudo: "John Doe",
        alias: "John",
        ban_until: null,
        email: "testemail@gmail",
        id_role: 1,
        photo: null,
        photo_temporaire: null,
        type: "user",
        is_private: false
    }
    const mockArtist = {
        external_urls: { spotify: 'https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN' },
        genres: [ 'french hip hop', 'old school rap francais', 'rap conscient' ],
        id: '4FpJcNgOvIpSBeJgRg3OfN',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab6761610000e5eb32086a424e6f1e499e347cde',
            width: 640
          },
        ],
        name: 'Orelsan',
        popularity: 64,
        type: 'artist',
    }
    const errror = {
        error: {
            status: 400,
            message: "message",
        }
    }
    describe("valid usecase", ()=>{
        
        it("should return true", async ()=>{
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(mockUser)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockArtist)
            mockLikeOeuvreRepository.doesUserLike = jest.fn().mockReturnValue(false)
            mockLikeOeuvreRepository.like = jest.fn()
            const result = await likeOeuvre(1,1,"artist",serviceLocator)
            expect(result).toBe(true)
        })

        it("should return false", async ()=>{
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(mockUser)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockArtist)
            mockLikeOeuvreRepository.doesUserLike = jest.fn().mockReturnValue(true)
            mockLikeOeuvreRepository.unlike = jest.fn()
            const result = await likeOeuvre(1,1,"artist",serviceLocator)
            expect(result).toBe(false)
        })
    })

    describe("invalid usecase", ()=>{
        it("should return error 401", async ()=>{
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(null)
            const error = await catchError(async ()=>{
                await likeOeuvre(1,1,"artist", serviceLocator)
            })
            expect(error.code).toBe(401)
        })
        it("should return error 400", async ()=>{
            mockAccessTokenManager.decode = jest.fn(()=>{return {value:1}})
            mockUserRepository.getByUser = jest.fn().mockReturnValue(mockUser)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(errror)
            const error = await catchError(async ()=>{
                await likeOeuvre(1,1,"artist", serviceLocator)
            })
            expect(error.code).toBe(400)
        })
    })
})