const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const { identity } = require("underscore");
module.exports = async (
  pseudo,
  userToken,
  page,
  pageSize,
  orderByLike,
  {
    reviewRepository,
    spotifyRepository,
    accessTokenManager,
    friendRepository,
    userRepository,
  }
) => {
  const testUsers = await userRepository.getByEmailOrPseudo(pseudo, pseudo);
  if (!testUsers) throwStatusCode(404, "l'utilisateur n'existe pas");
  let id = null;
  if (testUsers?.is_private) {
    let valid = false;
    if (userToken) {
      id = accessTokenManager.decode(userToken)?.value;
      if (await friendRepository.areFriends(id, testUsers.id_utilisateur))
        valid = true;
    }
    if (!valid) throwStatusCode(403, "l'utilisateur est en privé");
  }
  const reviews = await reviewRepository.getReviewByUserId(
    testUsers.id_utilisateur,
    page,
    pageSize,
    orderByLike
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
