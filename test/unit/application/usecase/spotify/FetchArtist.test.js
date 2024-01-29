const fetchArtist = require("../../../../../lib/application/use_cases/spotify/FetchArtist")
const catchError = require("../utils/catchError")
const {
    artistFixture, // reponse pas serialise
    expectedFixture, // reponse serialise 
} = require("../fixtures/fetchArtist")

const mockSpotifyRepository = {}


const idOrelsan = "4FpJcNgOvIpSBeJgRg3OfN"

describe('FetchArtist usecase', () => {
    it("should return a serialized artist item", async ()=>{
        mockSpotifyRepository.getSpotifyArtist = jest.fn((id) =>{
            return artistFixture
        })
        const result = await fetchArtist( // fetchArtist metier, serialize est fait a la fin 
            idOrelsan, 
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtist de mockSpotifyRepository
        expect(result).toEqual(expectedFixture)
        expect(mockSpotifyRepository.getSpotifyArtist).toHaveBeenCalledWith(idOrelsan) 
    })
    it("should return throw an error 400", async ()=>{
        mockSpotifyRepository.getSpotifyArtist = jest.fn((id) =>{
            throw new Error('test error')
        })
        const error = await catchError(async ()=> {
            await fetchArtist( // fetchArtist metier, serialize est fait a la fin
                idOrelsan,
                {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtist de mockSpotifyRepository

        })
        expect(error.code).toBe(400)
    })
});