const {
    albumRawOneArtist,
    expectedAlbumOneArtist,
    albumRawSeveralArtist,
    expectedAlbumSeveralArtist,
    albumRawNoArtist,
    expectedAlbumNoArtist
} = require("../../../interfaces/serializers/fixtures/albumTrackFixture")


const SpotifyRepositoryFixture = {
    albumRawOneArtist,
    albumRawSeveralArtist,
    albumRawNoArtist,
}

const expectedResult = { 
    expectedAlbumOneArtist,
    expectedAlbumSeveralArtist,
    expectedAlbumNoArtist
}

module.exports = {
    SpotifyRepositoryFixture,
    expectedResult
}