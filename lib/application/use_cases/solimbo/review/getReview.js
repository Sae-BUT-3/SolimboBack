const throwStatusCode = require("../../utils/throwStatusCode");
const reviewSerializer = require("../../../../interfaces/serializers/ReviewSerializer");
module.exports = async (idReview,userToken, {reviewRepository, spotifyRepository,accessTokenManager,friendRepository}) => {
    const rawReview = await reviewRepository.getById(idReview)
    if(!rawReview)
        throwStatusCode(404,"la review n'existe pas")
    if(rawReview.utilisateur.is_private) {
        let valid = false
        if(userToken) {
            const id = accessTokenManager.decode(userToken)?.value
            if(await friendRepository.areFriends(id,rawReview.utilisateur.id_utilisateur))
                valid = true
        }
        if(!valid)
            throwStatusCode(403, "l'utilisateur est en privé")
    }

    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    if(rawOeuvre.error)
        throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur)

}