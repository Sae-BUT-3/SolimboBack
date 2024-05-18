const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const getReview = require("./util/getReview");
module.exports = async (
  idReview,
  userToken,
  page,
  pageSize,
  orderByLike,
  {
    reviewRepository,
    spotifyRepository,
    accessTokenManager,
    friendRepository,
    commentRepository,
  }
) => {
  const rawReview = await getReview(idReview, userToken, {
    accessTokenManager,
    friendRepository,
    reviewRepository,
  });
  const rawOeuvre = await spotifyRepository.getOeuvre(
    rawReview.id_oeuvre,
    rawReview.type
  );
  if (rawOeuvre.error)
    throwStatusCode(rawOeuvre.error.status, rawOeuvre.error.message);

  let id_utilisateur = userToken
    ? accessTokenManager.decode(userToken)?.value
    : null;
  const comments = await commentRepository.getReviewComments(
    rawReview.id_review,
    id_utilisateur,
    false,
    page,
    pageSize,
    orderByLike
  );

  return reviewSerializer(
    rawReview,
    id_utilisateur,
    comments,
    spotifyRepository,
    reviewRepository,
    friendRepository
  );
};
