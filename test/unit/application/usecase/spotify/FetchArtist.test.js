const fetchArtist = require("../../../../../lib/application/use_cases/spotify/FetchArtist")
const {
    artistFixture, // reponse pas serialise
    expectedFixture, // reponse serialise 
} = require("../fixtures/fetchArtist")

const mockSpotifyRepository = {}
mockSpotifyRepository.getSpotifyArtist = jest.fn((id) =>{
    return artistFixture 
})

const idOrelsan = "4FpJcNgOvIpSBeJgRg3OfN"

describe('FetchArtist usecase', () => {
    it("should return a serialized artist item", async ()=>{
        const result = await fetchArtist( // fetchArtist metier, serialize est fait a la fin 
            idOrelsan, 
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtist de mockSpotifyRepository
        expect(result).toEqual(expectedFixture)
        expect(mockSpotifyRepository.getSpotifyArtist).toHaveBeenCalledWith(idOrelsan) 
    })
});