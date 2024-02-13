const unfollowUser = require('../../../../../lib/application/use_cases/friend/unfollowUser')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}

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
    mockUserRepository.getByUser = jest.fn((id )=> {
        user.id_utilisateur=id
        return user
    })
    mockFriendRepository.removeFriendById = jest.fn((id, id_ami) => {
        return null
    })

    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository
    }
    it('should remove a friend of a user', async () => {

        const user = await unfollowUser(1,2,serviceLocator)
        expect(user).toBe(null)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.removeFriendById).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id user', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await unfollowUser(-1,2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
    it('should throw error 400 invalid id friend', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            if (id < 0) return user
            return null
        })
        const error = await catchError(async ()=>{
            await unfollowUser(1,-2,serviceLocator)
        })
        console.log(error)
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });

    
})