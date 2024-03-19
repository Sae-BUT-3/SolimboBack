const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const getReview = require("./util/getReview")
module.exports = async (idReview,userToken,page,pageSize,orderByLike, {reviewRepository, spotifyRepository,accessTokenManager,friendRepository,commentRepository}) => {

    const rawReview = await getReview(idReview,userToken, {accessTokenManager,friendRepository,reviewRepository})
    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    if(rawOeuvre.error)
        throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)

    let doesUserLike = false
    let id_utilisateur = null
    if(userToken) {
        id_utilisateur = accessTokenManager.decode(userToken)?.value
        doesUserLike = await reviewRepository.doesUserLike(id_utilisateur,rawReview.id_review)
    } 
    const comments = await commentRepository.getReviewComments(rawReview.id_review,id_utilisateur,false,page,pageSize,orderByLike)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur,doesUserLike,comments)

}