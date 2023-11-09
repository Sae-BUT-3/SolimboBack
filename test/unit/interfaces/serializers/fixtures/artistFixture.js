const artistFixture = {
    external_urls: {
        spotify: "https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN"
    },
    id: "4FpJcNgOvIpSBeJgRg3OfN",
    name: "Orelsan",
    popularity: 10,
    genres: ['rock','funk'],
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
    ]
}
const expectedFixture = {

    id: "4FpJcNgOvIpSBeJgRg3OfN",
    name: "Orelsan",
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
    popularity: 10,
    genres:['rock','funk'],
    spotify_url: "https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN",
    type:"artist",
}

module.exports = {
    artistFixture,
    expectedFixture,
}