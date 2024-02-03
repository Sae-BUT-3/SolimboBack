const completeAccount = require('../../../../../lib/application/use_cases/user/CompleteAccount')
const catchError = require("../utils/catchError")
const mockUserRepository = {}
const mockDocumentRepository = {}
const mockAccessTokenManager = {}
const serviceLocator = {
    userRepository: mockUserRepository,
    documentRepository: mockDocumentRepository,
    accessTokenManager: mockAccessTokenManager
}
describe('CompleteAccount', () =>{
    const pseudo= 'testPseudo'
    const alias= 'testAlias'
    const bio= 'testBio'
    const confirm_token= 'confirmToken'
    const photo = "otherpath/to/file"
    const email = "testemail@gmail.com"
    const photo_temporaire = "path/to/file"
    const confirmed = false
    const id_utilisateur = 1
    const mockToken = 'token'
    const mockUser = {
        id_utilisateur,email,photo_temporaire,confirmed,confirm_token
    }
    mockAccessTokenManager.generate = jest.fn(() => mockToken)
    mockDocumentRepository.deleteFile = jest.fn(()=>{})
    mockUserRepository.updateUser = jest.fn((user)=>user)
    afterEach(()=>{
        jest.clearAllMocks();
    })
    it("should return user with replaced photo ", async ()=>{
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>null)
        mockUserRepository.getByConfirmToken = jest.fn(()=>{
            return {...mockUser}
        })
        const user = await completeAccount(pseudo,alias,bio,photo,confirm_token,serviceLocator)
        expect(user.token).toBe(mockToken)
        expect(user.email).toBe(email)

        expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(1)
    })
    it("should return user without replaced photo ", async ()=>{
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>null)
        mockUserRepository.getByConfirmToken = jest.fn(()=>{
            return {...mockUser}
        })
        const user = await completeAccount(pseudo,alias,bio,null,confirm_token,serviceLocator)
        expect(user.token).toBe(mockToken)
        expect(user.email).toBe(email)

        expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(0)
    })
    it("should return user without alias", async ()=>{
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>null)
        mockUserRepository.getByConfirmToken = jest.fn(()=>{
            return {...mockUser}
        })
        const user = await completeAccount(pseudo,null,bio,null,confirm_token,serviceLocator)
        expect(user.token).toBe(mockToken)
        expect(user.email).toBe(email)

    })
    it("should throw error 403 user already exists", async ()=>{
        mockUserRepository.getByConfirmToken = jest.fn(()=>{
            return {...mockUser}
        })
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>'something')
        const error = await catchError(async ()=>{
            await completeAccount(pseudo,null,bio,null,confirm_token,serviceLocator)
        })
        expect(error.code).toBe(403)
    })
    it("should throw error 400 invalid token", async ()=>{
        mockUserRepository.getByConfirmToken = jest.fn(()=>null)
        mockUserRepository.getByEmailOrPseudo = jest.fn(()=>null)
        const error = await catchError(async ()=>{
            await completeAccount(pseudo,null,bio,null,confirm_token,serviceLocator)
        })
        expect(error.code).toBe(400)
    })
})