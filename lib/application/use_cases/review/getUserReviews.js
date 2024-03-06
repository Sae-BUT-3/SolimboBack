const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (pseudo, userToken,page,pageSize, orderByLike, {reviewRepository, spotifyRepository,accessTokenManager,friendRepository,userRepository}) => {
    const testUsers = await userRepository.getByEmailOrPseudo(pseudo,pseudo)
    let id = null
    if (testUsers?.is_private) {
        let valid = false
        if (userToken) {
            id = accessTokenManager.decode(userToken)?.value
            if (await friendRepository.areFriends(id, testUsers.id_utilisateur))
                valid = true
        }
        if (!valid)
            throwStatusCode(403, "l'utilisateur est en privé")
    }
    const reviews = await reviewRepository.getReviewByUserId(testUsers.id_utilisateur,page,pageSize, orderByLike)
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
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur,doesUserLike)
}