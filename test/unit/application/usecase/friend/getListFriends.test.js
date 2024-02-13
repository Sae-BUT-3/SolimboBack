const getListFriends = require('../../../../../lib/application/use_cases/friend/getListFriends')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
const friends = [
    {
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
    },{
        id_utilisateur : 2,
        pseudo : "pseudotest",
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
]
const user = {
    id_utilisateur : 3,
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
describe("getListFriends", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })
    mockUserRepository.getByUser = jest.fn((id => user))
    mockFriendRepository.getListFriendsById = jest.fn((user) => {
        return friends
    })
   
    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository
    }
    it('should return list friends of a user', async () => {

        const user = await getListFriends(3,serviceLocator)
        expect(user).toBe(friends)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
        expect(mockFriendRepository.getListFriendsById).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id user', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await getListFriends(-1,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
   
})