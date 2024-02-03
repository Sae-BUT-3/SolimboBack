const Album = require("../../domain/model/Album");
const SerializeArtist = require("./ArtistSerializer");
const SerializeTrack = require("./AlbumTrackSerializer");

const serializeAlbum = (albumRaw) => {
    const tracks = albumRaw.tracks?.items ? albumRaw.tracks?.items.map(item => SerializeTrack(item)) : undefined
    const album = {
        id: albumRaw.id,
        total_tracks: albumRaw.total_tracks,
        spotify_url : albumRaw.external_urls.spotify,
        name: albumRaw.name,
        images: albumRaw.images,
        release_date : albumRaw.release_date,
        artists : albumRaw?.artists?.map(item => SerializeArtist(item)),
        tracks: tracks,
        genres : albumRaw?.genres,
        type : albumRaw?.album_group ?  albumRaw?.album_group : albumRaw?.album_type, // utilise album_group (plus precis pour fetchArtistSongs pour recuperer appears_on) sinon album_type (present dans fetchAlbum et fetchArtistSongs, n'a pas appears_on)
        popularity: albumRaw.popularity ? albumRaw.popularity : Math.floor(Math.random() * 100),
    };
    return new Album(album)
}

module.exports = serializeAlbum
