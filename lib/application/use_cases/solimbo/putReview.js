const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (idOeuvre, userToken, description, note, {accessTokenManager, userRepository,reviewRepository})=> {
    const id = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(await reviewRepository.getByUserAndId(id,idOeuvre)) throwStatusCode(403,"vous avez déjà posté une review")
    const ReviewRaw = {
        id_oeuvre: idOeuvre,
        id_utilisateur: id,
        description,
        note
    }
    await reviewRepository.persist(ReviewRaw)
}