const serializeTrack = require("../../../../lib/interfaces/serializers/TrackSerializer")
const {
    expectedRawTrackWithOneArtistOneAlbum,
    rawTrackWithOneArtistOneAlbum,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
    rawTrackWithNoAlbum,
    expectedRawTrackWithNoAlbum
} = require("./fixtures/trackFixture")
describe('albumSerialize', () => {
    it("should return serialized album with one artist", ()=>{
        const result = serializeTrack(rawTrackWithOneArtistOneAlbum)
        expectedRawTrackWithOneArtistOneAlbum.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithOneArtistOneAlbum)
    })

    it("should return serialized album with several artists", ()=>{
        const result = serializeTrack(rawTrackWithServeralArtists)
        expectedRawTrackWithServeralArtists.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithServeralArtists)
    })
    it("should return serialized album with no artist", ()=>{
        const result = serializeTrack(rawTrackWithNoArtist)
        expectedRawTrackWithNoArtist.album.popularity = result.album.popularity
        expect(result).toEqual(expectedRawTrackWithNoArtist)
    })
    it("should return serialized album with no album", ()=>{
        const result = serializeTrack(rawTrackWithNoAlbum)
        expect(result).toEqual(expectedRawTrackWithNoAlbum)
    })

});