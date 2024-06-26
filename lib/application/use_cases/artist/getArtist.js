const serializeArtiste = require("../../../interfaces/serializers/ArtistSerializer");
const throwStatusCode = require("../utils/throwStatusCode");
const UserPublic = require("../../../domain/model/UserPublic");
const ArtistPage = require("../../../domain/model/ArtistPage.js");
const serializeAlbum = require("../../../interfaces/serializers/AlbumSerializer");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer.js");
module.exports = async (
  artistId,
  userToken,
  {
    accessTokenManager,
    userRepository,
    spotifyRepository,
    reviewRepository,
    followRepository,
    friendRepository,
  }
) => {
  const id_utilisateur = accessTokenManager.decode(userToken)?.value;
  const user = await userRepository.getByUser(id_utilisateur);
  if (!user)
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  const artist = await spotifyRepository.getSpotifyArtist(artistId);
  if (artist.error) throwStatusCode(artist.error.status, artist.error.message);
  const doesUserFollow = await followRepository.doesFollows(
    id_utilisateur,
    artistId
  );
  const albums = await spotifyRepository.getSpotifyArtistSongs(
    artistId,
    "album,single,compilation,appears_on"
  );
  const album_ids = albums.items.map((album) => album.id);
  const [
    follower_count,
    friends_followers,
    friend_follower_count,
    reviewsByLike,
    reviewsByTime,
    reviewsByFriends,
  ] = await Promise.all([
    await followRepository.getFollowersCount(artistId),
    await followRepository.getFriendsFollowing(artistId, user.id_utilisateur, 3),
    await followRepository.getFriendsFollowingCount(artistId, user.id_utilisateur),
    await reviewRepository.getOeuvreReviews(
      1,
      3,
      true,
      false,
      false,
      album_ids,
      user.id_utilisateur
    ),
    await reviewRepository.getOeuvreReviews(
      1,
      3,
      false,
      false,
      false,
      album_ids,
      user.id_utilisateur
    ),
    await reviewRepository.getOeuvreReviews(
      1,
      3,
      false,
      false,
      true,
      album_ids,
      user.id_utilisateur
    ),
  ]);
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
    reviewsByFriends,
    { reviewRepository, spotifyRepository, friendRepository }
  );
};

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
  reviewsByFriends,
  { reviewRepository, spotifyRepository, friendRepository }
) => {
  artist.follower_count = followers_count;
  artist = serializeArtiste(artist);
  const relatedArtist = await spotifyRepository.getSpotifyRelatedArtist(artist.id);
  artist.relatedArtist = await relatedArtist?.artists.map((item)=> serializeArtiste(item))
  albums = await Promise.all(
    albums.items.map(async (item) => {
      item.rating = await reviewRepository.getOeuvreRating(item.id);
      item.reviewCount = await reviewRepository.getReviewCount(item.id);
      return serializeAlbum(item);
  })
  );

  friends_followers = {
    count: friend_follower_count,
    users: friends_followers.map((item) => {
      return new UserPublic(item);
    }),
  };
  const serializeReviews = (reviews) => {
    return reviews.map(async (review) => {
      return reviewSerializer(
        review,
        id_utilisateur,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      );
    });
  };
  reviewsByLike = await Promise.all(serializeReviews(reviewsByLike));

  reviewsByTime = await Promise.all(serializeReviews(reviewsByTime));

  reviewsByFriends = await Promise.all(serializeReviews(reviewsByFriends));
  return new ArtistPage(
    artist,
    albums,
    friends_followers,
    reviewsByLike,
    reviewsByTime,
    reviewsByFriends,
    doesUserFollow
  );
};
