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
  const count = await reviewRepository.geTimelineReviewCount(false, userToken);
  const serializedReviews = [];
  console.log("rawreviews", rawReviews)
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

  const data = {
    reviews: await Promise.all(serializedReviews),
    count: count,
  };
  return data;
};
