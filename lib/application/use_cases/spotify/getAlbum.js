const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const throwStatusCode = require("../utils/throwStatusCode");

module.exports = async (id, {spotifyRepository}) =>{
    const albumInfo = await spotifyRepository.getSpotifyAlbums(id)
    if(albumInfo.error)
        throwStatusCode(albumInfo.error.status,albumInfo.error.message)
    return  SerializeAlbum(albumInfo)
}