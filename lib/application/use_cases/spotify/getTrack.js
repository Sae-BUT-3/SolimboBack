const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (id, {spotifyRepository}) =>{
    const trackInfo = await spotifyRepository.getSpotifyTracks(id)
    if(trackInfo.error)
        throwStatusCode(trackInfo.error.status,trackInfo.error.message)
    return SerializeTrack(trackInfo)
}