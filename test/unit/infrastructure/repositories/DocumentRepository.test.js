const DocumentRepositoryTest = require("../../../../lib/infrastructure/repositories/DocumentRepository")
const createUser = require("../../../../lib/application/use_cases/user/CreateUser");
let filePath
const documentRepository = new DocumentRepositoryTest();
const mockFile = {
    hapi: {
        filename: "test.png"
    },
    _data: "testDFata"
}
describe('document repository',  ()=>{
    describe('document repository with no problem', ()=>{
        it('should create file without problem', async () =>{
            filePath=  await documentRepository.uploadFile("test/unit/infrastructure/repositories/testFolder", mockFile)
        })
        it('should creadzadte file without problem', async () =>{
            documentRepository.deleteFile(filePath)
        })
    })
    describe('document repository with errors', () =>{
        it("shouldn't create file",  async () =>{
            await expect(documentRepository.uploadFile("test/unit/infrastructure/repositories/testFolder",{})).rejects.toThrow()
        })
    })
})