const { deserializeNotification } = require("../../../interfaces/serializers/NotificationSerializer");
const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (commentId,userToken,{accessTokenManager,userRepository,commentRepository,notificationRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    const comment = await commentRepository.getById(commentId)
    if(! comment) throwStatusCode(404,"commentaire introuvable")
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(! await commentRepository.doesUserLike(commentId,id_utilisateur)){
        await commentRepository.like(commentId,id_utilisateur)
        if(comment.utilisateur.id_utilisateur !== id_utilisateur)
            await notificationRepository.persist(deserializeNotification("likeComment",id_utilisateur,comment.utilisateur.id_utilisateur,commentId))
        return true
    }
    await commentRepository.unlike(commentId,id_utilisateur)
}