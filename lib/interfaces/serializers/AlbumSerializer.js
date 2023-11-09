const Album = require("../../domain/model/Album")
const ArtistSerializer = require("./ArtistSerializer")
const serializeAlbum = (albumRaw) => {
    const album = {
        id: albumRaw.id,
        total_tracks: albumRaw.total_tracks,
        spotify_url : albumRaw.external_urls.spotify,
        name: albumRaw.name,
        images: albumRaw.images,
        release_date : albumRaw.release_date,
        artists : albumRaw?.artists?.map(item => ArtistSerializer(item)),
        genres : albumRaw?.genres,
        popularity: albumRaw.popularity ? albumRaw.popularity : Math.floor(Math.random() * 100)
    }
    return new Album(album)
}
module.exports = serializeAlbum