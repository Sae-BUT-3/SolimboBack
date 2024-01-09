const mockMailRepository = {}
const mockUserRepository = {}
const sendResetEmail = require("../../../../../lib/application/use_cases/user/sendResetEmail")
const serviceLocator = {
    mailRepository: mockMailRepository,
    userRepository: mockUserRepository
}
describe("sendResetEmail", ()=>{
    it("should return true",async ()=>{
        mockMailRepository.send = jest.fn(()=>{})
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return {reset_token: 1,confirmed: true}})
        mockUserRepository.updateUser = jest.fn(()=>{})

        expect(await sendResetEmail("testemail",serviceLocator)).toBe(true);
        expect(mockMailRepository.send).toHaveBeenCalledTimes(1)
    })
    it("should return false because the user is not confirmed",async ()=>{
        mockMailRepository.send = jest.fn(()=>{})
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return {reset_token: 1,confirmed:false}})
        mockUserRepository.updateUser = jest.fn(()=>{})
        expect(await sendResetEmail("testemail",serviceLocator)).toBe(false);
    })
    it("should return false because the user doesn't exists",async ()=>{
        mockMailRepository.send = jest.fn(()=>{})
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>{return null})
        mockUserRepository.updateUser = jest.fn(()=>{})
        expect(await sendResetEmail("testemail",serviceLocator)).toBe(false);
    })
})