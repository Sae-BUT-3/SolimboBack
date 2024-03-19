const getReviews = require("../../../../../lib/application/use_cases/review/getReviews")

const {
    mockArtist,
    rawReview,
    expectedReview,
} = require("./fixture/getReviewsFixture")

describe("getReviews Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
    }
    it("should return serialized review", async ()=>{

        mockReviewRepository.getReviews = jest.fn((page,pageSize,orderByLike, isPrivate,userToken) => [rawReview])
        mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
        mockReviewRepository.doesUserLike = jest.fn((id_utilisateur,reviewId) => false)
        const expectedReviews = [expectedReview]
        const result = await getReviews(1,10,true,undefined, serviceLocator)
        expect(result).toEqual(expectedReviews)
    })

    it("should return serialized review with user login", async ()=>{
        mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
        mockReviewRepository.getReviews = jest.fn((page,pageSize,orderByLike, isPrivate,userToken) => [rawReview])
        mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
        mockReviewRepository.doesUserLike = jest.fn((id_utilisateur,reviewId) => false)
        const expectedReviews = [expectedReview]
        const result = await getReviews(1,10,true,'something', serviceLocator)
        expect(result).toEqual(expectedReviews)
    })
})