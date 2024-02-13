const {
    artistFixture,
    expectedFixture,
} = require("./artistFixture")


const rawTrackWithOneArtist = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    artists: [
        artistFixture
    ],
    duration_ms: 12121231,
}

const expectedRawTrackWithOneArtist = {
    id:"test_id",
    name:"test_name",
    album: undefined,
    artists:[
        expectedFixture
    ],
    duration_ms:12121231,
    popularity: undefined,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}

const rawTrackWithServeralArtists = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    artists: [
        artistFixture
    ],
    duration_ms: 12121231,
}

const expectedRawTrackWithServeralArtists = {
    id:"test_id",
    name:"test_name",
    album: undefined,
    artists:[
        expectedFixture
    ],
    duration_ms:12121231,
    popularity: undefined,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}


const rawTrackWithNoArtist = {
    id: "test_id",
    name: "test_name",
    external_urls: {
        spotify: "https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA"
    },
    artists: undefined,
    duration_ms: 12121231,
}

const expectedRawTrackWithNoArtist = {
    id:"test_id",
    name:"test_name",
    artists: undefined,
    album: undefined,
    duration_ms:12121231,
    popularity: undefined,
    spotify_url:"https://open.spotify.com/track/4UVDKEPTgMQXv9UlIqVTcA",
    type:"track"
}

const albumRawOneArtist = {
    album_type: "album",
    total_tracks: 14,
    external_urls: {
        spotify: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy"
    },
    id: "17UiqpQyl8T8vVxz2Towjy",
    images: [
        {
            url: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height: 640,
            width: 640
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height: 300,
            width: 300
        },
        {
            url: "https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height: 64,
            width: 64
        }
    ],
    name: "Perdu D'Avance",
    release_date: "2009-02-16",
    genres: ["genre1", "genre2"],
    artists: [
        artistFixture
    ],
    tracks: {items : [
            rawTrackWithOneArtist
        ]},
}

const expectedAlbumOneArtist = {
    id:"17UiqpQyl8T8vVxz2Towjy",
    total_tracks:14,
    name:"Perdu D'Avance",
    popularity:0,
    release_date:"2009-02-16",
    spotify_url: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy",
    images:[
        {
            url:"https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height:640,
            width:640
        },
        {
            url:"https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height:300,
            width:300
        },
        {
            url:"https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height:64,
            width:64
        }
    ],
    artists:[
        expectedFixture
    ],
    tracks: [
        expectedRawTrackWithOneArtist

    ],
    genres: ["genre1", "genre2"],
    type:"album"
}

const albumRawSeveralArtist = {
    album_type: "album",
    total_tracks: 14,
    external_urls: {
        spotify: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy"
    },
    id: "17UiqpQyl8T8vVxz2Towjy",
    images: [
        {
            url: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height: 640,
            width: 640
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height: 300,
            width: 300
        },
        {
            url: "https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height: 64,
            width: 64
        }
    ],
    name: "Perdu D'Avance",
    release_date: "2009-02-16",
    genres: ["genre1", "genre2"],
    artists: [
        artistFixture,
        artistFixture
    ],
    tracks: {
        items: [
            rawTrackWithServeralArtists
        ],
    }

}

const expectedAlbumSeveralArtist = {
    id:"17UiqpQyl8T8vVxz2Towjy",
    total_tracks:14,
    name:"Perdu D'Avance",
    popularity:0,
    release_date:"2009-02-16",
    spotify_url: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy",
    images:[
        {
            url:"https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height:640,
            width:640
        },
        {
            url:"https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height:300,
            width:300
        },
        {
            url:"https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height:64,
            width:64
        }
    ],
    artists:[
        expectedFixture,
        expectedFixture
    ],
    tracks: [
        expectedRawTrackWithServeralArtists
    ],
    genres: ["genre1", "genre2"],
    type:"album"
}

const albumRawNoArtist = {
    album_type: "album",
    total_tracks: 14,
    external_urls: {
        spotify: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy"
    },
    id: "17UiqpQyl8T8vVxz2Towjy",
    images: [
        {
            url: "https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height: 640,
            width: 640
        },
        {
            url: "https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height: 300,
            width: 300
        },
        {
            url: "https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height: 64,
            width: 64
        }
    ],
    tracks: {items: [
            rawTrackWithNoArtist
        ]},
    name: "Perdu D'Avance",
    release_date: "2009-02-16",
    genres: ["genre1", "genre2"],
}

const expectedAlbumNoArtist = {
    id:"17UiqpQyl8T8vVxz2Towjy",
    total_tracks:14,
    name:"Perdu D'Avance",
    popularity:0,
    release_date:"2009-02-16",
    spotify_url: "https://open.spotify.com/album/17UiqpQyl8T8vVxz2Towjy",
    images:[
        {
            url:"https://i.scdn.co/image/ab67616d0000b2730b2e3999b189fa2a8a6a752f",
            height:640,
            width:640
        },
        {
            url:"https://i.scdn.co/image/ab67616d00001e020b2e3999b189fa2a8a6a752f",
            height:300,
            width:300
        },
        {
            url:"https://i.scdn.co/image/ab67616d000048510b2e3999b189fa2a8a6a752f",
            height:64,
            width:64
        }
    ],
    artists: undefined,
    tracks: [
        expectedRawTrackWithNoArtist
    ],
    genres: ["genre1", "genre2"],
    type:"album"
}
module.exports = {
    expectedRawTrackWithOneArtist,
    rawTrackWithOneArtist,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
    albumRawOneArtist,
    expectedAlbumOneArtist,
    albumRawSeveralArtist,
    expectedAlbumSeveralArtist,
    albumRawNoArtist,
    expectedAlbumNoArtist
}