const User = require("../../../../../lib/domain/model/User");
const {
    albumRawOneArtist,
    expectedAlbumOneArtist
} = require("../../../interfaces/serializers/fixtures/albumFixture")
const {
    artistFixture,
    expectedFixture
} = require("../../../interfaces/serializers/fixtures/artistFixture")
const {
    rawTrackWithOneArtistOneAlbum,
    expectedRawTrackWithOneArtistOneAlbum
} = require("../../../interfaces/serializers/fixtures/trackFixture")

albumRawOneArtist.popularity = 3
artistFixture.popularity = 2
rawTrackWithOneArtistOneAlbum.popularity = 1

expectedAlbumOneArtist.popularity = 3
expectedFixture.popularity = 2
expectedRawTrackWithOneArtistOneAlbum.popularity = 1
const mockUser = new User(
    1,
    'testPeudo',
    'testEmail@gmail.com',
    'test_alias',
    'testbio',
    'path/to/photo',
    'path/to/photo',
    'passwordtest',
    'spotifyToken',
    2,
    new Date("10-06-2003")
)
const SpotifyRepositoryFixture = {
    tracks : { items : [rawTrackWithOneArtistOneAlbum]},
    albums : {items : [albumRawOneArtist]},
    artists : {items : [artistFixture]}
}
const expectedSearchResult = [
    expectedAlbumOneArtist,
    expectedFixture,
    expectedRawTrackWithOneArtistOneAlbum,
]
const expectedSearchResultWithUsers = [
    expectedAlbumOneArtist,
    expectedFixture,
    expectedRawTrackWithOneArtistOneAlbum,
    mockUser
]
module.exports = {
    mockUser,
    SpotifyRepositoryFixture,
    expectedSearchResult,
    expectedSearchResultWithUsers
}