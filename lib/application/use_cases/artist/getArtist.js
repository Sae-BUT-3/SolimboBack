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
    const doesUserFollow = await followRepository.doesFollows(id_utilisateur,artistId)
    const albums = await spotifyRepository.getSpotifyArtistSongs(artistId,'album,single',50)

    const album_ids = albums.items.map((album)=>album.id)
    const [
        follower_count,
        friends_followers,
        friend_follower_count,
        reviewsByLike,
        reviewsByTime,
    ] = await Promise.all([
        followRepository.getFollowersCount(artistId),
        followRepository.getFriendsFollowing(artistId,user.id_utilisateur,3),
        followRepository.getFriendsFollowingCount(artistId,user.id_utilisateur),
        reviewRepository.getOeuvreReviews(1,3,true,false,album_ids,user.id_utilisateur),
        reviewRepository.getOeuvreReviews(1,3,false,false,album_ids,user.id_utilisateur),
    ])
    return await artistSerizilizer(
        user.id_utilisateur,
        doesUserFollow,
        artist,
        albums,
        follower_count,
        friends_followers,
        friend_follower_count,
        reviewsByLike,
        reviewsByTime,
        {reviewRepository,spotifyRepository}
    )
}

const artistSerizilizer = async (
    id_utilisateur,
    doesUserFollow,
    artist,
    albums,
    followers_count,
    friends_followers,
    friend_follower_count,
    reviewsByLike,
    reviewsByTime,
    {reviewRepository,spotifyRepository}) => {
    artist.follower_count = followers_count
    artist = serializeArtiste(artist)

    albums = await Promise.all(albums.items.map(async (item) => {
        item.rating = await reviewRepository.getOeuvreRating(item.id)
        item.reviewCount = await reviewRepository.getReviewCount(item.id)
        return serializeAlbum(item)
    }))

    friends_followers = {
        count: friend_follower_count,
        users: friends_followers.map(item => {
            return new UserPublic(item)
        })
    }
    
    reviewsByLike = await Promise.all(
        reviewsByLike.map(async (review) => {
            const doesUserLike = await reviewRepository.doesUserLike( id_utilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLike)
        })
    )

    reviewsByTime = await Promise.all(
        reviewsByTime.map(async (review) => {
            const doesUserLike = await reviewRepository.doesUserLike(id_utilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLike)
        })
    )
    return new ArtistPage(artist,albums,friends_followers,reviewsByLike,reviewsByTime,doesUserFollow)
}