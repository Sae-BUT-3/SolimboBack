const getTrack = require("../../../../../lib/application/use_cases/spotify/getTrack")
const {
    SpotifyRepositoryFixture,
    expectedResult,
} = require("../fixtures/getTrackFixture")

const mockSpotifyRepository = {}

mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
    return SpotifyRepositoryFixture
})

describe('get a track usecase', () => {
    it("should return a track", async ()=>{
        const result = await getTrack(
            "3YP99J8wTzG55t1cFmd6iq",
            {spotifyRepository : mockSpotifyRepository}
        )
            console.log(result)
        expect(result).toEqual(expectedResult)
    })
});
//see