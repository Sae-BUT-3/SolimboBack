const serializeTrack = require("../../../../lib/interfaces/serializers/AlbumTrackSerializer")
const {
    expectedRawTrackWithOneArtist,
    rawTrackWithOneArtist,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
} = require("./fixtures/albumTrackFixture")

describe('AlbumTrackSerializer', () => {
    it("should return serialized track with one artist", ()=>{
        const result = serializeTrack(rawTrackWithOneArtist)
        expect(result).toEqual(expectedRawTrackWithOneArtist)
    })

    it("should return serialized track with several artists", ()=>{
        const result = serializeTrack(rawTrackWithServeralArtists)
        expect(result).toEqual(expectedRawTrackWithServeralArtists)
    })
    it("should return serialized track with no artist", ()=>{
        const result = serializeTrack(rawTrackWithNoArtist)
        expect(result).toEqual(expectedRawTrackWithNoArtist)
    })
});