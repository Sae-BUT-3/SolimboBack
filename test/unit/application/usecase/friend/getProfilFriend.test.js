const getProfilFriend = require('../../../../../lib/application/use_cases/friend/getProfilFriend')
const catchError = require("../utils/catchError")
const mockFriendRepository = {}
const mockUserRepository = {}
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

const friend = {
    id_utilisateur : 2,
    pseudo : "pseudo22",
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

describe("getProfilFriend", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })

    beforeEach(()=>{
        mockUserRepository.getByUser = jest.fn((id)=> {
            return user.id_utilisateur == id ? user : friend
        })
        mockFriendRepository.getById = jest.fn((id, id_ami) => {
            return relation
        })
    
       
    })
    const serviceLocator = {
        userRepository: mockUserRepository,
        friendRepository: mockFriendRepository
    }
    it('should accept a request friend of a user', async () => {

        const res = await getProfilFriend(1,2,serviceLocator)
        expect(res).toBe(friend)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.getById).toHaveBeenCalledTimes(1)
    });
   
    it('should throw error 400 invalid id user', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await getProfilFriend(-1, 2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    });
    it('should throw error 400 invalid id ami', async () => {
        mockUserRepository.getByUser = jest.fn((id)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await getProfilFriend(1, -2,serviceLocator)
        })
        expect(error.code).toBe(400)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(1)
    })

    it('should throw error 403 friendship doesn\'t exist', async () => {
        mockFriendRepository.getById = jest.fn((id, id_ami)=> {
            return null
        })
        const error = await catchError(async ()=>{
            await getProfilFriend(1, 3,serviceLocator)
        })
        expect(error.code).toBe(403)
        expect(mockUserRepository.getByUser).toHaveBeenCalledTimes(2)
        expect(mockFriendRepository.getById).toHaveBeenCalledTimes(1)
    })
   
})