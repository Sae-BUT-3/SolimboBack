const { deserializeNotification } = require("../../../interfaces/serializers/NotificationSerializer");
const throwStatusCode = require("../utils/throwStatusCode");
const getReview = require("./util/getReview");
module.exports = async (
  userToken,
  idReview,
  description,
  {
    userRepository,
    accessTokenManager,
    friendRepository,
    reviewRepository,
    commentRepository,
    notificationRepository,
  }
) => {
  const id_utilisateur = accessTokenManager.decode(userToken)?.value;
  if (!(await userRepository.getByUser(id_utilisateur)))
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  const review = await getReview(idReview, userToken, {
    accessTokenManager,
    friendRepository,
    reviewRepository,
  });

  const comment = await commentRepository.persist(
    idReview,
    description,
    id_utilisateur,
    null
  );
  await notificationRepository.persist(
    deserializeNotification(
        "replyReview",
        id_utilisateur,
        review.utilisateur.id_utilisateur,
        idReview
    )
)
  return comment
};
