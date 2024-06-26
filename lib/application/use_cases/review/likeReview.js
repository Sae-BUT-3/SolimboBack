const { deserializeNotification } = require("../../../interfaces/serializers/NotificationSerializer");
const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (reviewId,userToken,{accessTokenManager,userRepository,reviewRepository,notificationRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const review = await reviewRepository.getById(reviewId)
    const notification = deserializeNotification(
        "likeReview",
        id_utilisateur,
        review.utilisateur.id_utilisateur,
        reviewId
    )
    if(! await reviewRepository.doesUserLike(id_utilisateur,reviewId)){
        await reviewRepository.likeReview(id_utilisateur,reviewId)
        if(review.utilisateur.id_utilisateur !== id_utilisateur)
        await notificationRepository.persist(notification)
        return true
    }
    await notificationRepository.destroy(notification)
    await reviewRepository.unlikeReview(id_utilisateur,reviewId)
}