const likeReview = require("../../../../../lib/application/use_cases/solimbo/review/likeReview")
const catchError = require("../utils/catchError")
describe("likeReview Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockUserRepository = {}


    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        userRepository: mockUserRepository,
    }
    describe("valid cases", ()=>{
        it("should like review", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => {return {value: 1}})
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.doesUserLikes = jest.fn((id) => true)
            mockReviewRepository.unlikeReview = jest.fn((id) => true)
            await likeReview(1,'token', serviceLocator)
            expect(mockReviewRepository.unlikeReview).toHaveBeenCalledTimes(1)
        })

        it("should unlike review", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => {return {value: 1}})
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.doesUserLikes = jest.fn((id) => false)
            mockReviewRepository.likeReview = jest.fn((id) => true)
            await likeReview(1,'token', serviceLocator)
            expect(mockReviewRepository.likeReview).toHaveBeenCalledTimes(1)
        })
    })
    describe("invalid cases", ()=>{
        it("should throw error bad auth token", async ()=>{
            mockUserRepository.getByUser = jest.fn((id) => null)
            const error = await catchError(async ()=>{
                await await likeReview(1,'token', serviceLocator)
            })
            expect(error.code).toBe(401)
        })
    })
})