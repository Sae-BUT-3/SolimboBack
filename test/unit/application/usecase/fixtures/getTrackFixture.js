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


const SpotifyRepositoryFixture = {
    rawTrackWithOneArtistOneAlbum,
    rawTrackWithServeralArtists,
    rawTrackWithNoArtist,
    rawTrackWithNoAlbum,
}

const expectedResult = {
    expectedRawTrackWithOneArtistOneAlbum,
    expectedRawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    expectedRawTrackWithNoAlbum
}
module.exports = {
    SpotifyRepositoryFixture,
    expectedResult
}