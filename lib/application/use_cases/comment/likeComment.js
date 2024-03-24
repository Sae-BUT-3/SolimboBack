const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (commentId,userToken,{accessTokenManager,userRepository,commentRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(! await commentRepository.doesUserLike(id_utilisateur,commentId)){
        await commentRepository.likeReview(id_utilisateur,commentId)
        return true
    }
    await commentRepository.unlikeReview(id_utilisateur,commentId)
}