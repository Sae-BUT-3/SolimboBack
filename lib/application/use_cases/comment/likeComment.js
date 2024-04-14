const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (commentId,userToken,{accessTokenManager,userRepository,commentRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await commentRepository.getById(commentId)) throwStatusCode(404,"commentaire introuvable")
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(! await commentRepository.doesUserLike(commentId,id_utilisateur)){
        await commentRepository.like(commentId,id_utilisateur,)
        return true
    }
    await commentRepository.unlike(commentId,id_utilisateur)
}