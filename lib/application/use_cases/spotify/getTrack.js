const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")

module.exports = async (id, {spotifyRepository}) =>{
    const trackInfo = await spotifyRepository.getSpotifyTracks(id)
    const track = SerializeTrack(trackInfo)
    return track
}