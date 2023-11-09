const Track = require("../../domain/model/Track")
const SerializeAlbum = require("./AlbumSerializer")
const SerializeArtist = require("./ArtistSerializer")
const serializeTrack = (trackRaw) => {
    const album = trackRaw.album ? SerializeAlbum(trackRaw?.album) : undefined
    const track = {
        id: trackRaw.id,
        name: trackRaw.name,
        album: album,
        artists: trackRaw?.artists?.map(item => SerializeArtist(item)),
        spotify_url : trackRaw.external_urls.spotify,
        duration_ms: trackRaw.duration_ms,
        popularity:trackRaw.popularity,
    }
    return new Track(track)
}

module.exports = serializeTrack