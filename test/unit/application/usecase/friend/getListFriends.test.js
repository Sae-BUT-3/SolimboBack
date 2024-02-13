const getListFriends = require('../../../../../lib/application/use_cases/friend/getListFriends')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
const mockAccesTokenManager = {}

mockAccesTokenManager.generate = ((test) =>{return ''})
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
    beforeEach(()=>{
        mockUserRepository.getByUser = jest.fn((id => user))
        mockFriendRepository.getListFriendsById = jest.fn((user) => {
            return friends
        })
        mockAccesTokenManager.decode = jest.fn((token)=> {return {value: 1}})
    })
    
    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository,
        accessTokenManager:mockAccesTokenManager
    }
    it('should return list friends of a user', async () => {

        const user = await getListFriends("testtoken",serviceLocator)
        expect(user).toBe(friends)
        expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
        expect(mockFriendRepository.getListFriendsById).toHaveBeenCalledTimes(1)
    });

    it('should throw error 400 invalid token user', async () => {
        mockAccesTokenManager.decode = jest.fn((token)=> {return {value: -1}})
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await getListFriends("testtoken", serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockAccesTokenManager.decode).toHaveBeenCalledTimes(1)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
   
})