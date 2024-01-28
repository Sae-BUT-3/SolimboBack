const throwStatusCode = require("../../utils/throwStatusCode");
const reviewSerializer = require("../../../../interfaces/serializers/ReviewSerializer");
module.exports = async (idReview, {reviewRepository, spotifyRepository}) => {
    const rawReview = await reviewRepository.getById(idReview)
    if(!rawReview)
        throwStatusCode(404,"la review n'existe pas")
    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    if(rawOeuvre.error)
        throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur)

}