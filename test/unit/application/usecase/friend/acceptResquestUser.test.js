const acceptRequestUser = require('../../../../../lib/application/use_cases/friend/acceptRequestUser')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
const relation = {
    id_utilisateur: 1,
    amiIdUtilisateur: 2,
    en_attente: false,
    createdAt: undefined,
    updatedAt: undefined,
    type : 'amis'
}
const user = {
    id_utilisateur : 1,
    pseudo : "pseudo",
    email : "test@test.fr",
    alias : undefined,
    photo : undefined,
    photo_temporaire : undefined,
    token : undefined,
    refresh_token : undefined,
    reset_token : undefined,
    password : "hjkklllllm",
    id_role : 1,
    ban_until : undefined,
    confirmed: undefined,
    confirm_token : undefined,
    is_private : true ,
    type :  'user'
}
describe("acceptRequestUser", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })
    beforeEach(()=>{
        mockUserRepository.getByUser = jest.fn((id)=> {
            user.id_utilisateur = id
            return user
        })
        mockFriendRepository.accept = jest.fn((id, id_ami) => {
            return relation
        })
    })
    
    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository
    }
    it('should accept a request friend of a user', async () => {

        const user = await acceptRequestUser(1,2,serviceLocator)
        expect(user).toBe(relation)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.accept).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id user', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await acceptRequestUser(-1, 2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
    it('should throw error 400 invalid id ami', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await acceptRequestUser(1, -2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    })

    it('should throw error 403 friendship doesn\'t exist', async () => {
        mockFriendRepository.accept = jest.fn((id, id_ami)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await acceptRequestUser(1, 3,serviceLocator)
        })
        expect(error.code).toBe(403)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.accept).toHaveBeenCalledTimes(1)
    })
   
})