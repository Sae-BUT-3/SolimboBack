const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  artistId,
  userToken,
  page,
  pageSize,
  orderByLike,
  friendsOnly,
  { reviewRepository, spotifyRepository, accessTokenManager, friendRepository }
) => {
  let id = null;
  if (userToken) {
    id = accessTokenManager.decode(userToken)?.value;
  }
  const artist = await spotifyRepository.getSpotifyArtist(artistId);
  if (artist.error) throwStatusCode(artist.error.status, artist.error.message);
  const albums = await spotifyRepository.getSpotifyArtistSongs(
    artistId,
    "album,single"
  );
  const album_ids = albums.items.map((album) => album.id);
  const reviews = await reviewRepository.getOeuvreReviews(
    page,
    pageSize,
    orderByLike,
    false,
    friendsOnly,
    album_ids,
    id
  );
  const serializedReviews = [];
  reviews.forEach((element) => {
    serializedReviews.push(
      reviewSerializer(
        element,
        id,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      )
    );
  });
  return await Promise.all(serializedReviews);
};
