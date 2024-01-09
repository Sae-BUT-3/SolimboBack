const mockUserRepository = {}
const resetPassword = require("../../../../../lib/application/use_cases/user/resetPassword")
const serviceLocator = {
    userRepository: mockUserRepository
}
require("dotenv").config()
const catchError = require("../utils/catchError")
const bcrypt = require("bcrypt");
describe("sendResetEmail", ()=>{
    it("should return true",async ()=>{
        mockUserRepository.getByResetToken = jest.fn(()=>{return {id:"test"}})
        mockUserRepository.updateUser = jest.fn(()=>{})
        const result = await resetPassword("testPassword","token",serviceLocator)
        expect(result.password).not.toBe("test");
        expect(mockUserRepository.updateUser).toHaveBeenCalledTimes(1)
    })
    it("should return error",async ()=>{
        mockUserRepository.getByResetToken = jest.fn(()=>{})
        mockUserRepository.updateUser = jest.fn(()=>{})
        const error = await catchError(async () =>{
            await resetPassword("testPassword","token",serviceLocator)
        })
        expect(error.code).toBe(400)
    })

})