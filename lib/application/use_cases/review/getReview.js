const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const getReview = require("./util/getReview");
module.exports = async (
  idReview,
  userToken,
  page,
  pageSize,
  orderByLike,
  lang,
  {
    reviewRepository,
    spotifyRepository,
    accessTokenManager,
    friendRepository,
    commentRepository,
    translateRepository,
  }
) => {
  const rawReview = await getReview(idReview, userToken, {
    accessTokenManager,
    friendRepository,
    reviewRepository,
  });
  console.log(rawReview);
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
  if (lang) {
    rawReview.translatedDescription = await translateRepository.translate(
      rawReview.description,
      lang
    );
  }
  return reviewSerializer(
    rawReview,
    id_utilisateur,
    comments,
    spotifyRepository,
    reviewRepository,
    friendRepository
  );
};
