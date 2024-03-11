const getUserReviews = require("../../../../../lib/application/use_cases/review/getUserReviews")
const catchError = require("../utils/catchError")
const {
    mockArtist,
    rawReview,
    expectedReview,
} = require("./fixture/getReviewFixture")

describe("getReviews Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const mockUserRepository = {}
    const mockFriendRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository,
    }
    describe("successful cases", ()=>{
        it("should return serialized review with public user", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: false
                }
            })
            mockReviewRepository.getReviewByUserId = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            const expectedReviews = [expectedReview]
            const result = await getUserReviews(1,'token',1,10,true, serviceLocator)
            expect(result).toEqual(expectedReviews)
        })
        it("should return serialized review with private user", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: true
                }
            })
            mockAccesTokenManager.decode = jest.fn((userToken) => {
                return {value: 1}
            })
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => true)
            mockReviewRepository.getReviewByUserId = jest.fn((id_utilisateur,page,pageSize,orderByLike) => [rawReview])
            mockSpotifyRepository.getOeuvre = jest.fn((id,type) => mockArtist)
            mockReviewRepository.doesUserLike = jest.fn((id_utilisateur,reviewId) => false)
            const expectedReviews = [expectedReview]
            const result = await getUserReviews(1,'token',1,10,true, serviceLocator)
            expect(result).toEqual(expectedReviews)
        })
    })
    describe("invalid cases", ()=>{
        
        it("should throw error user private 1", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: true
                }
            })
            const error = await catchError(async ()=>{
                await getUserReviews(1,undefined,1,10,true, serviceLocator)
            })
            expect(error.code).toBe(403)
        })
        it("should throw error user private 2", async ()=>{
            mockUserRepository.getByEmailOrPseudo = jest.fn((pseudo,email) => {
                return {
                    id_utilisateur: 1,
                    is_private: true
                }
            })
            mockAccesTokenManager.decode = jest.fn((userToken) => {
                return {value: 1}
            })
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            const error = await catchError(async ()=>{
                await getUserReviews(1,'token',1,10,true, serviceLocator)
            })
            expect(error.code).toBe(403)
            expect(mockFriendRepository.areFriends).toHaveBeenCalledTimes(1)
        })
    })
})