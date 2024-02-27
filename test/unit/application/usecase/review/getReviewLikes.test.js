const getReviewLikes = require("./../../../../../lib/application/use_cases/solimbo/review/getReviewLikes")
const catchError = require("../utils/catchError")
const {
    mockUser,
    mockPublicUser
} = require("./fixture/getReviewLikesFixture")
describe("getReviewLikes Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockUserRepository = {}
    const mockFriendRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository
    }
    describe("invalid cases", ()=>{

        it("should throw review not found error", async ()=>{
            mockReviewRepository.getById = jest.fn((id) => null)
            const error = await catchError(async ()=>{
                await getReviewLikes(1,'token',1,10, serviceLocator)
            })
            expect(error.code).toBe(404)
        })
        it("should throw user is private error 1", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => false)
            const error = await catchError(async ()=>{
                await getReviewLikes(1,'token',1,10, serviceLocator)
            })
            expect(error.code).toBe(403)
        })
        it("should throw user is private error 2", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            const error = await catchError(async ()=>{
                await getReviewLikes(1,undefined,1,10, serviceLocator)
            })
            expect(error.code).toBe(403)
        })
    })
    describe("valid cases", ()=>{
        it("should get review private like", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: true
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockAccesTokenManager.decode = jest.fn((token) => {return {value: 1}})
            mockFriendRepository.areFriends = jest.fn((id, id_ami) => true)
            mockReviewRepository.getLikes = jest.fn((id) => [mockUser])
            const result = await getReviewLikes(1,'token',1,10, serviceLocator)
           expect(result).toEqual([mockPublicUser])
        })
        it("should get review public", async ()=>{
            const mockReview = {
                utilisateur: {
                    id_utilisateur: 1,
                    pseudo: "John Doe",
                    is_private: false
                }
            }
            mockReviewRepository.getById = jest.fn((id) => mockReview)
            mockReviewRepository.getLikes = jest.fn((id) => [mockUser])
            const result = await getReviewLikes(1,undefined,1,10, serviceLocator)
           expect(result).toEqual([mockPublicUser])
        })
    })
})