const throwStatusCode = require("../utils/throwStatusCode.js");
const ArtistFollowersPage = require("../../../domain/model/ArtistFollowersPage.js"); 

module.exports = async (artistId, userToken, {accessTokenManager,userRepository, spotifyRepository, followRepository, friendRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    
    const artist = await spotifyRepository.getSpotifyArtist(artistId)
    if(artist.error)
        throwStatusCode(artist.error.status,artist.error.message)
        
    const followersFriendsList = await followRepository.getFriendsFollowing(artistId,id_utilisateur)
    const followersWithoutFriends = await followRepository.getArtistFollowersWithoutFriends(artistId, id_utilisateur)
    //const allFollowers = [...followersFriendsList, ...followersWithoutFriends];
    const allFollowers = {
        "followersFriendsList": followersFriendsList,
        "followersWithoutFriends": followersWithoutFriends
      }
    return new ArtistFollowersPage(artist, allFollowers)
}