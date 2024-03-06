
/*  Artist */

const artistFixture = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm"
  },
  id: "3fMbdgg4jU18AjLCKBhRSm",
  name: "Michael Jackson",
  popularity: 81,
  genres: ["r&b", "soul"],
  "images": [
    {
      "url": "https://i.scdn.co/image/ab6761610000e5eb0e08ea2c4d6789fbf5cbe0aa",
      "height": 640,
      "width": 640
    },
    {
      "url": "https://i.scdn.co/image/ab676161000051740e08ea2c4d6789fbf5cbe0aa",
      "height": 320,
      "width": 320
    },
    {
      "url": "https://i.scdn.co/image/ab6761610000f1780e08ea2c4d6789fbf5cbe0aa",
      "height": 160,
      "width": 160
    }
  ]
}

const artistExpectedFixture = {
  id: "3fMbdgg4jU18AjLCKBhRSm",
  name: "Michael Jackson",
  image: "https://i.scdn.co/image/ab6761610000e5eb0e08ea2c4d6789fbf5cbe0aa",
  popularity: 81,
  genres: ["r&b", "soul"],
  spotify_url: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  type: "artist",
}




/*  Pour appearsOn */
const artistFixtureAppearsOn = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4"
  },
  id: "3TVXtAsR1Inumwj472S9r4",
  name: "Drake",
  popularity: 97,
  genres: ["canadian hip hop","canadian pop","hip hop","pop rap","rap"],
  "images": [
    {
      "url": "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
      "height": 640,
      "width": 640
    },
    {
      "url": "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
      "height": 320,
      "width": 320
    },
    {
      "url": "https://i.scdn.co/image/ab6761610000f1784293385d324db8558179afd9",
      "height": 160,
      "width": 160
    }
  ]
}

const artistExpectedFixtureAppearsOn = {
  id: "3TVXtAsR1Inumwj472S9r4",
  name: "Drake",
  image: "https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9",
  popularity: 97,
  genres: ["canadian hip hop","canadian pop","hip hop","pop rap","rap"],
  spotify_url: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  type: "artist",
}


/* Album Raw */

const songsRawAlbumArtist = {
  items: [
    {
      album_type: 'album',
      total_tracks: 34,
      popularity: 50, // rentre a la main 
      external_urls: {
        spotify: "https://open.spotify.com/album/57TzZhbqvYoUBzJSVKFVlG"
      },
      id: "57TzZhbqvYoUBzJSVKFVlG",
      images: [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273822e06488f98e53e8743ff6b",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02822e06488f98e53e8743ff6b",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851822e06488f98e53e8743ff6b",
          "width": 64
        }
      ],
      name: "Thriller 40",
      release_date: "2022-11-18",
      artists: [
        artistFixture
      ],
      album_group: "album"
    }
  ]
}

/* Expected Album Raw */

const expectedAlbumArtist = [
  {
    id: "57TzZhbqvYoUBzJSVKFVlG",
    total_tracks: 34,
    name: "Thriller 40",
    popularity: 50, // rentre a la main 
    release_date: "2022-11-18",
    spotify_url: "https://open.spotify.com/album/57TzZhbqvYoUBzJSVKFVlG",
    image: "https://i.scdn.co/image/ab67616d0000b273822e06488f98e53e8743ff6b",
    artists: [
      artistExpectedFixture
    ],
    tracks: undefined,
    genres: undefined,
    type: "album"
  }
]



/* Single Raw */

const songsRawSingleArtist = {
  items: [
    {
      album_type: 'single',
      total_tracks: 1,
      popularity: 50, // rentre a la main 
      external_urls: {
        spotify: "https://open.spotify.com/album/6ST7naJFCe9iBeOleU5Ccu"
      },
      id: "6ST7naJFCe9iBeOleU5Ccu",
      images: [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b2739e9ceac980e4b6b59a766f8b",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e029e9ceac980e4b6b59a766f8b",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d000048519e9ceac980e4b6b59a766f8b",
          "width": 64
        }
      ],
      name: "Michael Jackson x Mark Ronson: Diamonds are Invincible",
      release_date: "2018-08-29",
      artists: [
        artistFixture
      ],
      album_group: "single"
    }
  ]
}

/* Expected Single Raw */

const expectedSingleArtist = [
  {
    id: "6ST7naJFCe9iBeOleU5Ccu",
    total_tracks: 1,
    name: "Michael Jackson x Mark Ronson: Diamonds are Invincible",
    popularity: 50, // rentre a la main 
    release_date: "2018-08-29",
    spotify_url: "https://open.spotify.com/album/6ST7naJFCe9iBeOleU5Ccu",
    image: "https://i.scdn.co/image/ab67616d0000b2739e9ceac980e4b6b59a766f8b",
    artists: [
      artistExpectedFixture
    ],
    tracks: undefined,
    genres: undefined,
    type: "single"
  }
]


/* Compilation Raw */

const songsRawCompilationArtist = {
  items: [
    {
      album_type: 'compilation',
      total_tracks: 14,
      popularity: 50, // rentre a la main 
      external_urls: {
        spotify: "https://open.spotify.com/album/2X8UOIkZQdcz2Hi5Ynt2uk"
      },
      id: "2X8UOIkZQdcz2Hi5Ynt2uk",
      images: [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02cde37cfdee48dc0eae1e2ab8",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851cde37cfdee48dc0eae1e2ab8",
          "width": 64
        }
      ],
      name: "Scream",
      release_date: "2017-09-27",
      artists: [
        artistFixture
      ],
      album_group: "compilation"
    }
  ]
}

/* Expected Compilation Raw */

const expectedCompilationArtist = [
  {
    id: "2X8UOIkZQdcz2Hi5Ynt2uk",
    total_tracks: 14,
    name: "Scream",
    popularity: 50, // rentre a la main 
    release_date: "2017-09-27", //fait
    spotify_url: "https://open.spotify.com/album/2X8UOIkZQdcz2Hi5Ynt2uk",
    image: "https://i.scdn.co/image/ab67616d0000b273cde37cfdee48dc0eae1e2ab8",
    artists: [
      artistExpectedFixture
    ],
    tracks: undefined,
    genres: undefined,
    type: "compilation"
  }
]



/* appears_on Raw */

const songsRawAppearsOnArtist = {
  items: [
    {
      album_type: 'album',
      total_tracks: 25,
      popularity: 50, // rentre a la main 
      external_urls: {
        spotify: "https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX"
      },
      id: "1ATL5GLyefJaxhQzSPVrLX",
      images: [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e02f907de96b9a4fbc04accc0d5",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d00004851f907de96b9a4fbc04accc0d5",
          "width": 64
        }
      ],
      name: "Scorpion",
      release_date: "2018-06-29",
      artists: [
        artistFixtureAppearsOn
      ],
      album_group: "appears_on"
    }
  ]
}

/* Expected appears_on Raw */

const expectedAppearsOnArtist = [
  {
    id: "1ATL5GLyefJaxhQzSPVrLX",
    total_tracks: 25,
    name: "Scorpion",
    popularity: 50, // rentre a la main 
    release_date: "2018-06-29", //fait
    spotify_url: "https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX",
    image: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5",
    artists: [
      artistExpectedFixtureAppearsOn
    ],
    tracks: undefined,
    genres: undefined,
    type: "appears_on"
  }
]


    

module.exports = {
  songsRawAlbumArtist,
  expectedAlbumArtist,
  songsRawSingleArtist,
  expectedSingleArtist,
  songsRawCompilationArtist,
  expectedCompilationArtist,
  songsRawAppearsOnArtist,
  expectedAppearsOnArtist
}