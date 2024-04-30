const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (userToken, artistId,type, {userRepository,likeOeuvreRepository,accessTokenManager,spotifyRepository}) =>{
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const oeuvre = spotifyRepository.getOeuvre(artistId,type)
    if(oeuvre.error) throwStatusCode(oeuvre.error.status,oeuvre.error.message)
    if(! await likeOeuvreRepository.doesUserLikes(id_utilisateur,artistId)) {
        await likeOeuvreRepository.like(id_utilisateur,artistId)
        return true
    }
    await likeOeuvreRepository.unlike(id_utilisateur,artistId)
    return false
}