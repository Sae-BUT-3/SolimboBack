const followUser = require('../../../../../lib/application/use_cases/friend/followUser')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
const mockMailRepository = {}
const relation = {
    id_utilisateur: 1,
    amiIdUtilisateur: 2,
    en_attente: true,
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
describe("followUser", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })
    mockUserRepository.getByUser = jest.fn((id) => {
        user.id_utilisateur = id
        return user
    })
    mockFriendRepository.persist = jest.fn((friend) => {
        return friend
    })
    mockMailRepository.send = jest.fn(option => null)

    const serviceLocator = {
        userRepository: mockUserRepository,
        mailRepository: mockMailRepository,
        friendRepository: mockFriendRepository
    }
    it('should return friendship', async () => {

        const res = await followUser(1,2,serviceLocator)
        expect(res).toEqual(relation)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.persist).toHaveBeenCalledTimes(1)
        expect(mockMailRepository.send).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id user', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await followUser(-1,1,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
    it('should throw error 400 invalid id friend', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            if (id != -1) return user
            return null
        })
        const error = await catchError(async ()=>{
            await followUser(1,-1,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
    });

    it('should throw error 403 friendship exist', async () => {
        mockFriendRepository.persist = jest.fn((user)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await followUser(1,2,serviceLocator)
        })
        expect(error.code).toBe(403)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.persist).toHaveBeenCalledTimes(1)
    });
})