mockAccessTokenManager = {}
mockUserRepository = {}
mockDocumentRepository = {}
mockID = 12424
const uploadPreview = require("../../../../../lib/application/use_cases/user/uploadPreview")
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
            await expect(uploadPreview(invalidMockFile,'token', {
                accessTokenManager: mockAccessTokenManager,
                userRepository: mockUserRepository,
                documentRepository: mockDocumentRepository
            })).rejects.toThrow("le fichier fourni n'est pas une image")
        } )
        it('should throw 500 error',async() =>{
            mockDocumentRepository.uploadFile = jest.fn((path,file) => null)
            await expect(uploadPreview(mockFile,'token', {
                accessTokenManager: mockAccessTokenManager,
                userRepository: mockUserRepository,
                documentRepository: mockDocumentRepository
            })).rejects.toThrow("internal server error")
        } )
        it('should throw 401 error',async() =>{
            mockUserRepository.getByUser = jest.fn((id) => null)
            await expect(uploadPreview(mockFile,'token', {
                accessTokenManager: mockAccessTokenManager,
                userRepository: mockUserRepository,
                documentRepository: mockDocumentRepository
            })).rejects.toThrow("votre token d'authentification n'est pas le bon")
        } )
    })

})