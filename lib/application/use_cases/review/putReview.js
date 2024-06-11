const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  idOeuvre,
  userToken,
  description,
  note,
  type,
  {
    accessTokenManager,
    userRepository,
    reviewRepository,
    spotifyRepository,
    friendRepository,
  }
) => {
  const id_utilisateur = accessTokenManager.decode(userToken)?.value;

  if (!(await userRepository.getByUser(id_utilisateur)))
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  if (await reviewRepository.getByUserAndId(idOeuvre, id_utilisateur))
    throwStatusCode(403, "vous avez déjà posté une review");
  const id_type_review = await reviewRepository.getTypeReviewID(type);
  if (!id_type_review) throwStatusCode(404, "ce type de review n'existe pas");
  const rawOeuvre = await spotifyRepository.getOeuvre(idOeuvre, type);
  if (rawOeuvre.error)
    throwStatusCode(rawOeuvre.error.status, rawOeuvre.error.message);

  const ReviewRaw = {
    id_oeuvre: idOeuvre,
    id_utilisateur,
    description,
    note,
    id_type_review,
  };
  const review = await reviewRepository.persist(ReviewRaw);
  return reviewSerializer(
    review,
    id_utilisateur,
    undefined,
    spotifyRepository,
    reviewRepository,
    friendRepository
  );
};
