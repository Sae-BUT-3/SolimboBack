const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (OeuvreId, userToken,page,pageSize, orderByLike, {reviewRepository, spotifyRepository,accessTokenManager}) => {
    let id = null
    if (userToken) {
        id = accessTokenManager.decode(userToken)?.value
    }
    const reviews = await reviewRepository.getOeuvreReviews(page,pageSize, orderByLike,false,[OeuvreId],id)
    const serializedReviews = []
    reviews.forEach(element => {

        serializedReviews.push(serializeReview(element,id,spotifyRepository,reviewRepository))
    })
    return await Promise.all(serializedReviews)
}


const serializeReview = async (rawReview,id_utilisateur,spotifyRepository,reviewRepository) => {
    let doesUserLike = false
    if(id_utilisateur) {
        doesUserLike = await reviewRepository.doesUserLike(id_utilisateur,rawReview.id_review)
    }
    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    if(rawOeuvre.error) throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur,doesUserLike)
}