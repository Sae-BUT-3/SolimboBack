const deleteReview = require("./../../../../../lib/application/use_cases/solimbo/review/deleteReview")
const catchError = require("../utils/catchError")
describe("deleteReview Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockUserRepository = {}
    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        userRepository: mockUserRepository,
    }
    describe("valid cases", ()=>{
        it("should delete review", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.delete = jest.fn((id) => true)
            await deleteReview(1,'token', serviceLocator)
            expect(mockReviewRepository.delete).toHaveBeenCalledTimes(1)
        })
    })
    describe("invalid cases", ()=>{
        it("should throw error bad auth token", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => null)
            const error = await catchError(async ()=>{
                await deleteReview(1,'token', serviceLocator)
            })
            expect(error.code).toBe(401)
        })
        it("should throw error not post owner", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockReviewRepository.delete = jest.fn((id) => false)
            const error = await catchError(async ()=>{
                await deleteReview(1,'token', serviceLocator)
            })
            expect(error.code).toBe(403)
        })
        
    })
    
})