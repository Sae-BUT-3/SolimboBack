const throwStatusCode = require("../../utils/throwStatusCode");
const reviewSerializer = require("../../../../interfaces/serializers/ReviewSerializer");
const getReview = require("./util/getReview")
module.exports = async (idReview,userToken, {reviewRepository, spotifyRepository,accessTokenManager,friendRepository}) => {
    
    const rawReview = await getReview(idReview,userToken, {accessTokenManager,friendRepository,reviewRepository})
    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    if(rawOeuvre.error)
        throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur)

}