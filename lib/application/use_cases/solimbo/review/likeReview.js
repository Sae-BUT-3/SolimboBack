const throwStatusCode = require("../../utils/throwStatusCode");
module.exports = async (reviewId,userToken,{accessTokenManager,userRepository,reviewRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    console.log(await reviewRepository.doesUserLikes(id_utilisateur,reviewId))
    if(! await reviewRepository.doesUserLikes(id_utilisateur,reviewId)){
        await reviewRepository.likeReview(id_utilisateur,reviewId)
        return true
    }
    await reviewRepository.unlikeReview(id_utilisateur,reviewId)
}