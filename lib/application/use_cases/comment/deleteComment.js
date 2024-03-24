const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (idComment, userToken, {accessTokenManager, userRepository,commentRepository})=> {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(!await commentRepository.delete(idComment,id_utilisateur)) throwStatusCode(403,"ce n'est pas votre post")
    return true
}