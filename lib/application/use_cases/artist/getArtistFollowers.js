const throwStatusCode = require("../utils/throwStatusCode.js");
const ArtistFollowersPage = require("../../../domain/model/ArtistFollowersPage.js"); 
const UserPublic = require("../../../domain/model/UserPublic.js");

module.exports = async (artistId, userToken, {accessTokenManager,userRepository, spotifyRepository, followRepository, friendRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    
    const artist = await spotifyRepository.getSpotifyArtist(artistId)
    if(artist.error)
        throwStatusCode(artist.error.status,artist.error.message)
        
    const followersFriendsList = await followRepository.getFriendsFollowing(artistId,id_utilisateur)
    const followersWithoutFriends = await followRepository.getArtistFollowersWithoutFriends(artistId, id_utilisateur)

    const followersFriendsList2 = await Promise.all(followersFriendsList.map(async (item) => {
        const areFriends = await friendRepository.areFriends(id_utilisateur, item.id_utilisateur);
        const userPublicFriends = new UserPublic(item)
        return {
            ...userPublicFriends,
            areFriends: areFriends
        };
    }));

    const followersWithoutFriendst2 = await Promise.all(followersWithoutFriends.map(async (item) => {
        let areFriends = await friendRepository.areFriends(id_utilisateur, item.id_utilisateur);
        const userPublicNoFriends = new UserPublic(item)
        if(id_utilisateur == item.id_utilisateur) {
            areFriends = false
        }
        return {
            ...userPublicNoFriends,
            areFriends: areFriends
        };
    }));
    
    const allFollowers = [...followersFriendsList2, ...followersWithoutFriendst2];
    
    return new ArtistFollowersPage(artist, allFollowers)
}