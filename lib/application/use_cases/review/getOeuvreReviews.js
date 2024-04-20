const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  OeuvreId,
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
  const reviews = await reviewRepository.getOeuvreReviews(
    page,
    pageSize,
    orderByLike,
    false,
    friendsOnly,
    [OeuvreId],
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
