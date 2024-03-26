const throwStatusCode = require("../utils/throwStatusCode");
const PublicComment = require("../../../domain/model/PublicComment")
const UserPublic = require("../../../domain/model/UserPublic")
module.exports = async (
    commentId,
    description,
    userToken,
    {friendRepository,accessTokenManager,commentRepository,userRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const comment = await commentRepository.getById(commentId)
    if(comment.utilisateur.is_private && !(await friendRepository.areFriends(id_utilisateur,comment.utilisateur.id_utilisateur)))
            throwStatusCode(403, "l'utilisateur est en privé")
    const commentRaw = await commentRepository.persist(comment.id_review,description,id_utilisateur,commentId)
    return new PublicComment(commentRaw,new UserPublic(comment.utilisateur))
}