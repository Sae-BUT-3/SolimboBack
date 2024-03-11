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
const {tracks} = require("../../../../../lib/domain/model/Album");

albumRawOneArtist.popularity = 3
artistFixture.popularity = 2
rawTrackWithOneArtistOneAlbum.popularity = 1

expectedAlbumOneArtist.popularity = 3
expectedFixture.popularity = 2
expectedRawTrackWithOneArtistOneAlbum.popularity = 1

const SpotifyRepositoryFixture = {
    tracks : { items : [rawTrackWithOneArtistOneAlbum]},
    albums : {items : [albumRawOneArtist]},
    artists : {items : [artistFixture]}
}
const expectedSearchResult = [
    {
        id: "4FpJcNgOvIpSBeJgRg3OfN",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "",
        title: "Orelsan",
        type: "artist"
    },
    {
        id: "17UiqpQyl8T8vVxz2Towjy",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "Orelsan",
        title: "Perdu D'Avance",
        type: "album"
    },

    {
        id: "test_id",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "Orelsan",
        title: "test_name",
        type: "track"
    },
]
const expectedSearchResultWithUsers = [
    {
        id: "4FpJcNgOvIpSBeJgRg3OfN",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "",
        title: "Orelsan",
        type: "artist"
    },
    {
        id: "17UiqpQyl8T8vVxz2Towjy",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "Orelsan",
        title: "Perdu D'Avance",
        type: "album"
    },

    {
        id: "test_id",
        imageURL: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
        subtitle: "Orelsan",
        title: "test_name",
        type: "track"
    },
    {
        id: "id_utilisateur",
        imageURL: "photo",
        subtitle: "pseudo",
        title: "alias",
        type: "user"
    }
]
const mockUser = {
    id_utilisateur: "id_utilisateur",
    pseudo: "pseudo",
    email: "email",
    alias: "alias",
    photo: "photo",
    photo_temporaire: "photo_temporaire",
    token: "token",
    refresh_token: "refresh_token",
    reset_token: "reset_token",
    password: "password",
    id_role: "id_role",
    ban_until: "ban_until",
    confirmed: "confirmed",
    confirm_token: "confirm_token",
    type:  "user"
}
module.exports = {
    mockUser,
    SpotifyRepositoryFixture,
    expectedSearchResult,
    expectedSearchResultWithUsers
}