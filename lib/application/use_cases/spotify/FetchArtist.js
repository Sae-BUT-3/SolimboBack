const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")
const throwStatusCode = require("../utils/throwStatusCode")

module.exports = async (id, {spotifyRepository}) =>{
let artistInfo = {}
    try{
        artistInfo = await spotifyRepository.getSpotifyArtist(id)
    }
     catch(error){
        throwStatusCode(400, `l'id : ${id} n'existe pas`)
   }
   
    const artist = SerializeArtist(artistInfo) // Formatage de l'objet
    return artist
}