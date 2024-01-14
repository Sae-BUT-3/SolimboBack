const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const { result } = require("underscore")

module.exports = async (id, {spotifyRepository}) =>{
    const albumInfo = await spotifyRepository.getSpotifyAlbums(id)

    let result = []
    const tracks = albumInfo?.tracks ?
        albumInfo?.tracks?.items.map(item => SerializeTrack(item)) : []
    const albums = albumInfo?.albums ? albumInfo?.albums?.items.map(item => SerializeAlbum(item)) : []
    result.push(...tracks)
    result.push(...albums)
    return result
}