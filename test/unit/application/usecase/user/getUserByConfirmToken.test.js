const getUserByConfirmToken = require('../../../../../lib/application/use_cases/user/getUserByConfirmToken')
const mockUser = {
    id_utilisateur:1,
    pseudo:'pseudo',
    alias:'alias',
    email:'testemail@gmail.com',
    photo:'path/to/file',
    photo_temporaire: 'path/to/file',
    token:'token',
    refresh_token:'refreshToken',
    password:'password',
    id_role:1,
    ban_until:null,
    confirmed:false,
    confirm_token:'fezfezgezrhgez',
    type:'user',
}
const expectedUser = {
    id_utilisateur:1,
    pseudo:'pseudo',
    alias:'alias',
    email:'testemail@gmail.com',
    photo:'path/to/file',
    photo_temporaire: 'path/to/file',
    id_role:1,
    ban_until:null,
    type:'user',
}
const mockUserRepository = {}
describe('getUserByPseudo',()=>{
    afterEach(async () => {
        jest.clearAllMocks();
    });
    it('should return Public User',async ()=>{
        console.log("test")
        mockUserRepository.getByConfirmToken = jest.fn(()=>mockUser)
        const result = await getUserByConfirmToken("test",{userRepository:mockUserRepository})
        expect(result).toEqual(expectedUser)
    })
    it('should return null',async ()=>{
        mockUserRepository.getByConfirmToken = jest.fn(()=>null)
        const result = await getUserByConfirmToken("test",{userRepository:mockUserRepository})
        expect(result).toBeNull()
    })
})