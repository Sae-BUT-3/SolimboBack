const getTrack = require("../../../../../lib/application/use_cases/spotify/getTrack")
const {
    expectedRawTrackWithOneArtistOneAlbum,
    rawTrackWithOneArtistOneAlbum,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
    rawTrackWithNoAlbum,
    expectedRawTrackWithNoAlbum
} = require("../../../interfaces/serializers/fixtures/trackFixture")
const catchError = require("../utils/catchError");

const mockSpotifyRepository = {}


describe('get a track usecase', () => {
    it("should return a track with one artist", async ()=>{
        mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
            return rawTrackWithOneArtistOneAlbum
        })

        const result = await getTrack(
            "3YP99J8wTzG55t1cFmd6iq",
            {spotifyRepository : mockSpotifyRepository}
        )
        expectedRawTrackWithOneArtistOneAlbum.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithOneArtistOneAlbum)
    })
    it("should return a track with several artists", async ()=>{
        mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
            return rawTrackWithServeralArtists
        })

        const result = await getTrack(
            "3YP99J8wTzG55t1cFmd6iq",
            {spotifyRepository : mockSpotifyRepository}
        )
        expectedRawTrackWithOneArtistOneAlbum.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithServeralArtists)
    })
    it("should return a track with no artist", async ()=>{
        mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
            return rawTrackWithNoArtist
        })

        const result = await getTrack(
            "3YP99J8wTzG55t1cFmd6iq",
            {spotifyRepository : mockSpotifyRepository}
        )
        expectedRawTrackWithOneArtistOneAlbum.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithNoArtist)
    })
    it("should return a track with no album", async ()=>{
        mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
            return rawTrackWithNoAlbum
        })

        const result = await getTrack(
            "3YP99J8wTzG55t1cFmd6iq",
            {spotifyRepository : mockSpotifyRepository}
        )
        expect(result).toEqual(expectedRawTrackWithNoAlbum)
    })
    it("should throw error", async ()=>{
        mockSpotifyRepository.getSpotifyTracks = jest.fn((id) =>{
            return {error : {status: 400, message: "msg"}}
        })

        const error = await catchError(async ()=>{
            await getTrack(
                "3YP99J8wTzG55t1cFmd6iq",
                {spotifyRepository : mockSpotifyRepository}
            )
        })
        expect(error.code).toBe(400)
    })
});


