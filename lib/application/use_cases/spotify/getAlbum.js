const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")

module.exports = async (id, {spotifyRepository}) =>{
    const albumInfo = await spotifyRepository.getSpotifyAlbums(id)
    const album =  SerializeAlbum(albumInfo)
    return album
}