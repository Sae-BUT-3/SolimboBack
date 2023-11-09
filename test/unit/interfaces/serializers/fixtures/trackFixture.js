const {
    artistFixture,
    expectedFixture,
} = require("./artistFixture")

const {
    albumRawOneArtist,
    expectedAlbumOneArtist
} = require("./albumFixture")

const rawTrackWithOneArtistOneAlbum = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    album: albumRawOneArtist,
    artists: [
        artistFixture
    ],
    duration_ms: 12121231,
    popularity:64,
}

const expectedRawTrackWithOneArtistOneAlbum = {
    id:"test_id",
    name:"test_name",
    album: expectedAlbumOneArtist,
    artists:[
        expectedFixture
    ],
    duration_ms:12121231,
    popularity:64,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}

const rawTrackWithServeralArtists = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    album: albumRawOneArtist,
    artists: [
        artistFixture
    ],
    duration_ms: 12121231,
    popularity:64,
}

const expectedRawTrackWithServeralArtists = {
    id:"test_id",
    name:"test_name",
    album:expectedAlbumOneArtist,
    artists:[
        expectedFixture
    ],
    duration_ms:12121231,
    popularity:64,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}


const rawTrackWithNoArtist = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    album: albumRawOneArtist,
    artists: undefined,
    duration_ms: 12121231,
    popularity:64,
}

const expectedRawTrackWithNoArtist = {
    id:"test_id",
    name:"test_name",
    album:expectedAlbumOneArtist,
    artists: undefined,
    duration_ms:12121231,
    popularity:64,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}



const rawTrackWithNoAlbum = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    album: undefined,
    artists: [
        artistFixture
    ],
    duration_ms: 12121231,
    popularity:64,
}

const expectedRawTrackWithNoAlbum = {
    id:"test_id",
    name:"test_name",
    album: undefined,
    artists:[
        expectedFixture
    ],
    duration_ms:12121231,
    popularity:64,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}

module.exports = {
    expectedRawTrackWithOneArtistOneAlbum,
    rawTrackWithOneArtistOneAlbum,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
    rawTrackWithNoAlbum,
    expectedRawTrackWithNoAlbum
}