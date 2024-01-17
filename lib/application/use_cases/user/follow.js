const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (userToken, artistId, {userRepository,followRepository,accessTokenManager,spotifyRepository}) =>{
    const id = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const artist = spotifyRepository.getSpotifyArtist(artistId)
    if(artist.error) throwStatusCode(artist.error.status,artist.error.message)
    if(! await followRepository.doesFollows(id,artistId)) {
        followRepository.follow(id,artistId)
        return true
    }
    followRepository.unfollow(id,artistId)
    return false

}