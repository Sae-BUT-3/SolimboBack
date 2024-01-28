const FetchArtistSongs = require("../../../../../lib/application/use_cases/spotify/FetchArtistSongs")
const {
    fixture, 
    expectedResult

} = require("../../../interfaces/serializers/fixtures/artistAlbumsFixture")

console.log("FIXTURE/", fixture)
const mockSpotifyRepository = {}
mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
    return fixture 
})

const filter = 1
const id = "XXXX"


describe('FetchArtistSongs usecase', () => {
    it("should return a serialized artist item", async ()=>{
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            "album",
            1,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            console.log("RESULTAT: ", result)
            console.log("expected: ", expectedResult)

        expect(result).toEqual(expectedResult)
        expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, "album", 1) 

    })
});