const mockArtist = {
    external_urls: { spotify: 'https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN' },
    genres: [ 'french hip hop', 'old school rap francais', 'rap conscient' ],
    id: '4FpJcNgOvIpSBeJgRg3OfN',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab6761610000e5eb32086a424e6f1e499e347cde',
        width: 640
      },
    ],
    name: 'Orelsan',
    popularity: 64,
    type: 'artist',
  }
const mockAlbumRaw = {
    "href": "https://api.spotify.com/v1/artists/4FpJcNgOvIpSBeJgRg3OfN/albums?include_groups=album,single&offset=0&limit=10",
    "items": [
      {
        "album_group": "album",
        "album_type": "album",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN"
            },
            "id": "4FpJcNgOvIpSBeJgRg3OfN",
            "name": "Orelsan",
            "type": "artist"
          }
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/68YP0pEgwhnfRqQAzu71gP"
        },
        "id": "68YP0pEgwhnfRqQAzu71gP",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b2732724364cd86bb791926b6cc8",
            "width": 640
          }
        ],
        "name": "Civilisation Edition Ultime",
        "release_date": "2022-10-28",
        "total_tracks": 25,
        "type": "album"
      }
    ]
}
const mockUser = {
    id_utilisateur: 1,
    pseudo: "John Doe",
    alias: "John",
    ban_until: null,
    email: "testemail@gmail",
    id_role: 1,
    photo: null,
    photo_temporaire: null,
    type: "user",
    is_private: false
}

const mockUserPrivate = {
    pseudo: "John Doe2",
    alias: "John",
    ban_until: null,
    email: "testemail@gmail",
    id_role: 1,
    id_utilisateur: 1,
    photo: null,
    photo_temporaire: null,
    type: "user",
    is_private: true
}
const actualDate = new Date()


const mockLikedReview = {
  "id_review": 25,
  "id_oeuvre": "68YP0pEgwhnfRqQAzu71gP",
  "countlikes": 32,
  "countComment": 0,
  "description": "Innovation sonore à son apogée, repoussant les limites de l'expérimentation musicale. #AvantGarde #SoundExploration",
  "note": 5,
  "createdAt": "2024-01-03T00:00:00.000Z",
  "updated_at": "2024-01-03T00:00:00.000Z",
  "type": "album",
  "utilisateur": {
    "id_utilisateur": 54,
    "pseudo": "Constance",
    "email": "Constance.Constance@gmail.com",
    "alias": "Constance",
    "photo": "https://ozgrozer.github.io/100k-faces/0/6/006026.jpg",
    "photo_temporaire": null,
    "token": null,
    "refresh_token": null,
    "reset_token": null,
    "password": "$2b$10$feqJS.qjWmoYovS805Mmhu.7VjOncR68em0Bu4LSxS/4tDSP8HWK2",
    "id_role": 1,
    "ban_until": null,
    "confirmed": true,
    "confirm_token": null,
    "auth_with_spotify": false,
    "is_private": true,
    "type": "user"
  }
}

const mockCommentedReview = {
  "id_review": 25,
  "id_oeuvre": "68YP0pEgwhnfRqQAzu71gP",
  "countlikes": 32,
  "countComment": 0,
  "description": "Innovation sonore à son apogée, repoussant les limites de l'expérimentation musicale. #AvantGarde #SoundExploration",
  "note": 5,
  "createdAt": "2024-01-03T00:00:00.000Z",
  "updated_at": "2024-01-03T00:00:00.000Z",
  "type": "album",
  "utilisateur": {
    "id_utilisateur": 54,
    "pseudo": "Constance",
    "email": "Constance.Constance@gmail.com",
    "alias": "Constance",
    "photo": "https://ozgrozer.github.io/100k-faces/0/6/006026.jpg",
    "photo_temporaire": null,
    "token": null,
    "refresh_token": null,
    "reset_token": null,
    "password": "$2b$10$feqJS.qjWmoYovS805Mmhu.7VjOncR68em0Bu4LSxS/4tDSP8HWK2",
    "id_role": 1,
    "ban_until": null,
    "confirmed": true,
    "confirm_token": null,
    "auth_with_spotify": false,
    "is_private": true,
    "type": "user"
  }
}

const mockOeuvreReviewSpotify = {
  "album_type": "album",
  "artists": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN"
      },
      "id": "4FpJcNgOvIpSBeJgRg3OfN",
      "name": "Orelsan",
      "type": "artist"
    }
  ],

  "external_urls": {
    "spotify": "https://open.spotify.com/album/68YP0pEgwhnfRqQAzu71gP"
  },
  "genres": [],
  "id": "68YP0pEgwhnfRqQAzu71gP",
  "images": [
    {
      "height": 640,
      "url": "https://i.scdn.co/image/ab67616d0000b2732724364cd86bb791926b6cc8",
      "width": 640
    }
  ],
  "name": "Civilisation Edition Ultime",
  "popularity": 60,
  "release_date": "2022-10-28",
  "total_tracks": 1,
  "tracks": {
    "href": "https://api.spotify.com/v1/albums/68YP0pEgwhnfRqQAzu71gP/tracks?offset=0&limit=50",
    "items": [
        {
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/4FpJcNgOvIpSBeJgRg3OfN"
                },
                "href": "https://api.spotify.com/v1/artists/4FpJcNgOvIpSBeJgRg3OfN",
                "id": "4FpJcNgOvIpSBeJgRg3OfN",
                "name": "Orelsan",
                "type": "artist",
                "uri": "spotify:artist:4FpJcNgOvIpSBeJgRg3OfN"
              }
            ],
       
            "disc_number": 1,
            "duration_ms": 161732,
            "external_urls": {
              "spotify": "https://open.spotify.com/track/7b3YQboXo3kau9YVUyx3r4"
            },
            "id": "7b3YQboXo3kau9YVUyx3r4",
            "name": "CP_001_ Intro Civilisation Perdue",
            "preview_url": "https://p.scdn.co/mp3-preview/b7f3ef4f7ee54bcba700a821952539b7e4e21d2f?cid=24b7c8fbb7d146edbce14e1743cea479",
            "track_number": 1,
            "type": "track"
        }
    ],
    "total": 25
  },
  "type": "album"
}


module.exports = {
  mockUser,
  mockArtist,
  mockUserPrivate,
  mockAlbumRaw,
  mockLikedReview,
  mockCommentedReview,
  mockOeuvreReviewSpotify,
}