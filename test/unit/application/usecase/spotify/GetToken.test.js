const getToken = require("../../../../../lib/application/use_cases/spotify/GetToken")
const createUser = require("../../../../../lib/application/use_cases/user/CreateUser");
const mockSpotifyRepository = {}

describe("GetToken", () =>{
    describe("GetToken valid ", ()=>{

        it("should return valid json", async ()=>{
            expectedSpotifyCode = {
                access_token: "access_token",
                refresh_token: "refresh_token",
            }
            mockSpotifyRepository.getToken = jest.fn((code )=> {return expectedSpotifyCode})
            const result = await getToken("code",{spotifyRepository: mockSpotifyRepository})
        })
    })
    describe("GetToken invalid ", ()=>{
        it("should return error", async ()=>{
            expectedSpotifyCode = {
                error: "something"
            }
            mockSpotifyRepository.getToken = jest.fn((code )=> {return expectedSpotifyCode})
            await expect(getToken("code",{spotifyRepository: mockSpotifyRepository})
            ).rejects.toThrow('something')

        })
    })
})
