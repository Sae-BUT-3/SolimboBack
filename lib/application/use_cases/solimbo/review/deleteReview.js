const throwStatusCode = require("../../utils/throwStatusCode");
module.exports = async (idReview, userToken, {accessTokenManager, userRepository,reviewRepository,spotifyRepository})=> {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(!await reviewRepository.delete(idReview,id_utilisateur)) throwStatusCode(403,"de n'est pas votre post")
}