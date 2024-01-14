const getAlbum = require("../../../../../lib/application/use_cases/spotify/getalbum")
const {
    SpotifyRepositoryFixture,
    expectedResult,
} = require("../fixtures/getAlbumFixture")

const mockSpotifyRepository = {}

mockSpotifyRepository.getSpotifyAlbums = jest.fn((id) =>{
    return SpotifyRepositoryFixture
})
describe('get an album usecase', () => {
    it("should return an album", async ()=>{
        const result = await getAlbum(
            "45i3tB9z0dgJ33olyrsLUz",
            {spotifyRepository : mockSpotifyRepository}
        )
        console.log(result)
        expect(result).toEqual(expectedResult)
    })
});
//see