const {
    artistFixture,
    expectedFixture,
} = require("./artistFixture")

const {
    expectedRawTrackWithOneArtist,
    rawTrackWithOneArtist,
    expectedRawTrackWithServeralArtists,
    rawTrackWithServeralArtists,
    expectedRawTrackWithNoArtist,
    rawTrackWithNoArtist,
} = require('./albumTrackFixture')

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
    tracks: undefined,
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
    tracks: undefined,
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
    tracks: undefined,
    
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
    tracks: undefined,
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
    tracks: undefined,
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
    tracks: undefined,
    genres: ["genre1", "genre2"],
    type:"album"
}
module.exports = {
    albumRawOneArtist,
    expectedAlbumOneArtist,
    albumRawSeveralArtist,
    expectedAlbumSeveralArtist,
    albumRawNoArtist,
    expectedAlbumNoArtist
}