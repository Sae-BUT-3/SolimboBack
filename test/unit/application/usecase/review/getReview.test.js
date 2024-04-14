const getReview = require("../../../../../lib/application/use_cases/review/getReview")
const catchError = require("../utils/catchError")

const {
    mockArtist,
    rawReview,
    expectedReview,
    rawReviewPrivate,
    expectedPrivate,
    mockComments
} = require("./fixture/getReviewFixture")


describe("getReview Test", ()=>{
    const mockReviewRepository = {}
    const mockFriendRepository = {}
    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const mockCommentRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        friendRepository: mockFriendRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
        commentRepository: mockCommentRepository
    }

    describe("successful cases", () => {
        it("should return review with artist from repository", async () => {
            mockReviewRepository.getById = jest.fn((id) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockCommentRepository.getReviewComments = jest.fn().mockReturnValue(mockComments)
            const result = await getReview(1,undefined,1,10,true, serviceLocator)
            console.log(result)
            expect(result).toEqual(expectedReview)
        })
        it("should return review with artist private from repository", async () => {
            mockReviewRepository.getById = jest.fn((id) => rawReviewPrivate)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => true)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockReviewRepository.doesUserLike = jest.fn((id_utilisateur,reviewId) => false)
            const result = await getReview(1,'something',1,10,true, serviceLocator)
            expect(result).toEqual(expectedPrivate)
        })
        
    })
    describe("invalid cases", () => {
        it("should throw review not found error", async () => {
            mockReviewRepository.getById = jest.fn((id) => null)
            const error = await catchError(async () => {
                await getReview(1,undefined,1,10,true, serviceLocator)
            })
            console.log(error)
            expect(error.code).toBe(404)
        })
        it("should throw user private 1", async () => {
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            const error = await catchError(async () => {
                await getReview(1,undefined,1,10,true, serviceLocator)
            })
            expect(error.code).toBe(403)
        })
        
        it("should throw user private 2", async () => {
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            const error = await catchError(async () => {
                await getReview(1,'something',1,10,true, serviceLocator)
            })
            expect(error.code).toBe(403)
            expect(mockFriendRepository.areFriends).toHaveBeenCalledTimes(1)
            expect().hasBee
        })
        it("should throw error review not found ", async () => {
            mockReviewRepository.getById = jest.fn((id) => rawReview)
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => {
                return {
                    error: {
                        status: 400,
                        message: "message",
                    }
                }
            })
            const error = await catchError(async () => {
                await getReview(1,undefined,1,10,true, serviceLocator)
            })
            expect(error.code).toBe(400)

        })
    })
})
