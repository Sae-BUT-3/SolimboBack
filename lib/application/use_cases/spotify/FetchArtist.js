const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")

module.exports = async (id, {spotifyRepository}) =>{

    const artistInfo = await spotifyRepository.getSpotifyArtist(id)

    const artist = SerializeArtist(artistInfo) // Formatage de l'objet
    return artist
}