mockAccessTokenManager = {}
mockUserRepository = {}
mockDocumentRepository = {}
mockID = 12424
const uploadPreview = require("../../../../../lib/application/use_cases/user/uploadPreview")
const catchError = require("../utils/catchError");
const mockFile = {
    hapi: {
        filename: "test.png",
        headers: {
            'content-type' : 'image/png'
        }
    },
    _data: "testDFata"
}
mockAccessTokenManager.decode = jest.fn((token) => mockID)
mockUserRepository.getByUser = jest.fn((id) => 'something')
mockUserRepository.addPreviewPath = jest.fn((id,path) => {})
mockDocumentRepository.deleteFile = jest.fn((path) => path)
mockUserRepository.getPreviewPath = jest.fn((id) =>  null)
mockDocumentRepository.uploadFile = jest.fn((path,file) => path)
describe("uploadPreview usecase",  ()=>{
    describe("valid upload preview cases", ()=>{
        it('should upload the image without deleting previous file',async() =>{
            mockUserRepository.getPreviewPath = jest.fn((id) =>  null)
            const path = await uploadPreview(mockFile,'token', {
                accessTokenManager: mockAccessTokenManager,
                userRepository: mockUserRepository,
                documentRepository: mockDocumentRepository
            })
            expect(path).not.toBeNull()
            expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(0)
        } )
        it('should upload the image and deleting previous file',async() =>{
            mockUserRepository.getPreviewPath = jest.fn((id) =>  'path')
            const path = await uploadPreview(mockFile,'token', {
                accessTokenManager: mockAccessTokenManager,
                userRepository: mockUserRepository,
                documentRepository: mockDocumentRepository
            })
            expect(path).not.toBeNull()
            expect(mockDocumentRepository.deleteFile).toHaveBeenCalledTimes(1)
        } )
    })
    describe("invalid upload preview cases", ()=> {

        const invalidMockFile = {
            hapi: {
                filename: "test.rpg",
                headers: {
                    'content-type' : 'image/rpg'
                }
            },
            _data: "testDFata"
        }
        it('should throw 415 error',async() =>{
            const error = await catchError(async ()=>{
                await uploadPreview(invalidMockFile,'token', {
                    accessTokenManager: mockAccessTokenManager,
                    userRepository: mockUserRepository,
                    documentRepository: mockDocumentRepository
                })
            })
            expect(error.code).toBe(415)
        } )
        it('should throw 500 error',async() =>{
            mockDocumentRepository.uploadFile = jest.fn((path,file) => null)
            const error = await catchError(async ()=>{
                await uploadPreview(mockFile,'token', {
                    accessTokenManager: mockAccessTokenManager,
                    userRepository: mockUserRepository,
                    documentRepository: mockDocumentRepository
                })
            })
            expect(error.code).toBe(500)

        } )
        it('should throw 401 error',async() =>{
            mockUserRepository.getByUser = jest.fn((id) => null)
            const error = await catchError(async ()=>{
                await uploadPreview(mockFile,'token', {
                    accessTokenManager: mockAccessTokenManager,
                    userRepository: mockUserRepository,
                    documentRepository: mockDocumentRepository
                })
            })
            expect(error.code).toBe(401)
        } )
    })

})