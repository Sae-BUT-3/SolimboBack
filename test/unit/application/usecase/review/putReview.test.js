const putReview = require("../../../../../lib/application/use_cases/review/putReview")
const catchError = require("../utils/catchError")
describe("putReview Test", ()=>{
    const idOeuvre = 'idOeuvre'
    const userToken = 'token'
    const description = 'description'
    const note = 5
    const type = 'artist'
    const {
        rawReview,
        mockArtist,
        expectedReview,
    } = require("./fixture/putReviewFixture")
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const mockUserRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
        userRepository: mockUserRepository,
    }
    describe("invalid cases", ()=>{

        it("should throw error bad auth token", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => null)
            const error = await catchError(async ()=>{
                await putReview(idOeuvre, userToken, description,note, type, serviceLocator)
            })
            expect(error.code).toBe(401)
        })
        it("should throw error review already posted", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => {
                return {
                    id_review: 1
                }
            })
           
            const error = await catchError(async ()=>{
                await putReview(idOeuvre, userToken, description,note, type, serviceLocator)
            })
            expect(error.code).toBe(403)
        })
        it("should throw error type review doesn't exist", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => null)
            mockReviewRepository.getTypeReviewID = jest.fn((type) => null)
            const error = await catchError(async ()=>{
                await putReview(idOeuvre, userToken, description,note, type, serviceLocator)
            })
            expect(error.code).toBe(404)
            expect(mockReviewRepository.getTypeReviewID).toHaveBeenCalledTimes(1)
        })
        it("should throw error rawOeuvre ", async ()=>{
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => null)
            mockReviewRepository.getTypeReviewID = jest.fn((type) => 1)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => {
                return {
                    error: {
                        status: 400,
                        message: 'error'
                    }
                }
            })
            const error = await catchError(async ()=>{
                await putReview(idOeuvre, userToken, description,note, type, serviceLocator)
            })
            expect(error.code).toBe(400)
        })
    })
    describe("valid cases", ()=>{

        it("should put review", async ()=>{
            mockUserRepository.getByUser =  jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.getByUserAndId =  jest.fn((idOeuvre, id_utilisateur) => null)
            mockReviewRepository.getTypeReviewID = jest.fn((type) => 1)
            mockReviewRepository.persist = jest.fn((reviewRaw) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockAccesTokenManager.decode =  jest.fn((userToken) => 1)
            const result = await putReview(idOeuvre, userToken, description,note, type, serviceLocator)
            expect(result).toEqual(expectedReview)
        })
            
    })
})