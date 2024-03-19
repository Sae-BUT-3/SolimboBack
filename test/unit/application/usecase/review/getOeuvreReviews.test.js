const getOeuvreReviews = require("../../../../../lib/application/use_cases/review/getOeuvreReviews")
const catchError = require("../utils/catchError")
const {
    mockArtist,
    rawReview,
    expectedReview,
} = require("./fixture/getOeuvreReviewsFixture")

describe("getReviews Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
    }
    describe("successful cases", ()=>{
        it("should return serialized review with public user", async ()=>{
            mockReviewRepository.getOeuvreReviews = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const expectedReviews = [expectedReview]
            const result = await getOeuvreReviews(1,undefined,1,10,true, serviceLocator)
            expect(result).toEqual(expectedReviews)
        })
        it("should return serialized review with private user", async ()=>{

            mockAccesTokenManager.decode = jest.fn((userToken) => {
                return {value: 1}
            })
            mockReviewRepository.getOeuvreReviews = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockReviewRepository.doesUserLike = jest.fn((id_utilisateur,reviewId) => false)
            const expectedReviews = [expectedReview]
            const result = await getOeuvreReviews(1,'token',1,10,true, serviceLocator)
            expect(result).toEqual(expectedReviews)
        })
    })
   
})