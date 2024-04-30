const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  page,
  pageSize,
  orderByLike,
  friendsOnly,
  userToken,
  { reviewRepository, spotifyRepository, accessTokenManager, friendRepository }
) => {
  if (userToken) userToken = accessTokenManager.decode(userToken)?.value;
  const rawReviews = await reviewRepository.getReviews(
    page,
    pageSize,
    orderByLike,
    false,
    friendsOnly,
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
