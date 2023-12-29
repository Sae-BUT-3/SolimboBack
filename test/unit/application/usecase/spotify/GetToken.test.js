const getToken = require("../../../../../lib/application/use_cases/spotify/GetToken")
const catchError = require("../utils/catchError")
const mockSpotifyRepository = {}

describe("GetToken", () =>{
    describe("GetToken valid ", ()=>{

        it("should return valid json", async ()=>{
            const expectedSpotifyCode = {
                access_token: "access_token",
                refresh_token: "refresh_token",
            }
            mockSpotifyRepository.getToken = jest.fn((code )=> {return expectedSpotifyCode})
            const result = await getToken("code",{spotifyRepository: mockSpotifyRepository})
        })
    })
    describe("GetToken invalid ", ()=>{
        it("should return error", async ()=>{
            const expectedSpotifyCode = {
                error: "something"
            }
            mockSpotifyRepository.getToken = jest.fn((code )=> {return expectedSpotifyCode})
            const error = await catchError(async ()=>{
                await getToken("code",{spotifyRepository: mockSpotifyRepository})
            })
            expect(error.code).toBe(400)
        })
    })
})
