const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  userToken,
  page,
  pageSize,
  orderByLike,
  { reviewRepository, spotifyRepository, accessTokenManager, friendRepository }
) => {
  if (userToken) userToken = accessTokenManager.decode(userToken)?.value;
  const rawReviews = await reviewRepository.geTimeline(
    page,
    pageSize,
    orderByLike,
    false,
    userToken
  );
  const serializedReviews = [];
  rawReviews.forEach((element) => {
    serializedReviews.push(
      reviewSerializer(
        element,
        userToken,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      )
    );
  });
  return await Promise.all(serializedReviews);
};
