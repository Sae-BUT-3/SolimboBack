const serializeArtiste = require("../../../interfaces/serializers/ArtistSerializer");
const throwStatusCode = require("../utils/throwStatusCode");
const UserPublic = require("../../../domain/model/UserPublic");
const ArtistPage = require("../../../domain/model/ArtistPage.js");
const serializeAlbum = require("../../../interfaces/serializers/AlbumSerializer");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer.js");
module.exports = async (artistId, userToken, {accessTokenManager,userRepository, spotifyRepository, reviewRepository,followRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    const user = await userRepository.getByUser(id_utilisateur)
    if(!user) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const artist = await spotifyRepository.getSpotifyArtist(artistId)
    if(artist.error)
        throwStatusCode(artist.error.status,artist.error.message)
    const albums = await spotifyRepository.getSpotifyArtistSongs(artistId,'album',10)
    const follower_count = await followRepository.getFollowersCount(artistId)
    const friends_followers = await followRepository.getFriendsFollowing(artistId,user.id_utilisateur,3)
    const reviewsByLike = await reviewRepository.getOeuvreReviews(1,3,true,false,artistId,user.id_utilisateur)
    const reviewsByTime = await reviewRepository.getOeuvreReviews(1,3,true,true,artistId,user.id_utilisateur)
    return await artistSerizilizer(
        artist,
        albums,
        follower_count,
        friends_followers,
        reviewsByLike,
        reviewsByTime,
        {reviewRepository,spotifyRepository}
    )
}

const artistSerizilizer = async (artist,albums,followers_count,friends_followers,reviewsByLike,reviewsByTime,{reviewRepository,spotifyRepository}) => {
    artist.follower_count = followers_count
    artist = serializeArtiste(artist)

    albums = await Promise.all(albums.items.map(async (item) => {
        
        item.rating = await reviewRepository.getOeuvreRating(item.id)
        return serializeAlbum(item)
    }))
    friends_followers = friends_followers.map(item => {
        return new UserPublic(item)
    })
    
    
    reviewsByLike = await Promise.all(
        reviewsByLike.map(async (review) => {
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur)
        })
    )

    reviewsByTime = await Promise.all(
        reviewsByTime.map(async (review) => {
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur)
        })
    )
    return new ArtistPage(artist,albums,friends_followers,reviewsByLike,reviewsByTime)
}