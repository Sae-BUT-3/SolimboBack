

fixture = {
items: [
  {
    album_group: 'album',
    album_type: 'album',
    artists: [ [Object] ],
    external_urls: {
      spotify: 'https://open.spotify.com/album/1WVIJaAboRSwJOe4u0n0Q7'
    },
    href: 'https://api.spotify.com/v1/albums/1WVIJaAboRSwJOe4u0n0Q7',
    id: '1WVIJaAboRSwJOe4u0n0Q7',
    images: [ [Object], [Object], [Object] ],
    name: 'GABRIEL',
    release_date: '2022-03-25',
    release_date_precision: 'day',
    total_tracks: 12,
    type: 'album',
    uri: 'spotify:album:1WVIJaAboRSwJOe4u0n0Q7',
    popularity: 1, 
  }
]
}
expectedResult = [
  {
    id: '1WVIJaAboRSwJOe4u0n0Q7',
    name: 'GABRIEL',
    popularity: 1, //en dur 
    release_date: '2022-03-25',
    total_tracks: 12,
    images: [ [Object], [Object], [Object] ],
    spotify_url: 'https://open.spotify.com/album/1WVIJaAboRSwJOe4u0n0Q7',
    artists: [ [Object] ],
    tracks: undefined,
    genres: undefined,
    type: 'album',
  }
];


// à rajouter par la suite pour single, compilation, appears_on

module.exports = {
    fixture, 
    expectedResult

}