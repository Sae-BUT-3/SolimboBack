const unfollowUser = require('../../../../../lib/application/use_cases/friend/unfollowUser')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
const mockAccesTokenManager = {}

mockAccesTokenManager.generate = ((test) =>{return ''})
const relation = {
    id_utilisateur: undefined,
    amiIdUtilisateur: undefined,
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
describe("unfollowUser", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })
    beforeEach(()=>{
        mockUserRepository.getByUser = jest.fn((id)=> {
            user.id_utilisateur=id
            return user
        })
        mockFriendRepository.removeFriendById = jest.fn((id, id_ami) => {
            relation.id_utilisateur = id
            relation.amiIdUtilisateur = id_ami
            return relation
        })
        mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
    })

    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository,
        accessTokenManager:mockAccesTokenManager
    }
    it('should remove a friend of a user', async () => {
        const user = await unfollowUser("testtoken",2,serviceLocator)
        expect(user).toBe(relation)
        expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id friend', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            if (id < 0) return user
            return null
        })
        const error = await catchError(async ()=>{
            await unfollowUser("testtoken",-2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });

    
})