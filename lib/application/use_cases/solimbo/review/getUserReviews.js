const throwStatusCode = require("../../utils/throwStatusCode");
const reviewSerializer = require("../../../../interfaces/serializers/ReviewSerializer");
module.exports = async (idUser, userToken,page,pageSize, orderByLike, {reviewRepository, spotifyRepository,accessTokenManager,friendRepository,userRepository}) => {
    const testUsers = await userRepository.getByUser(idUser)
    if (testUsers?.is_private) {
        let valid = false
        if (userToken) {
            const id = accessTokenManager.decode(userToken)?.value
            if (await friendRepository.areFriends(id, idUser))
                valid = true
        }
        if (!valid)
            throwStatusCode(403, "l'utilisateur est en privé")
    }
    const reviews = await reviewRepository.getReviewByUserId(idUser,page,pageSize, orderByLike)
    console.log(reviews)
    const serializedReviews = []
    reviews.forEach(element => {
        serializedReviews.push(serializeReview(element,spotifyRepository))
    })
    return await Promise.all(serializedReviews)
}


const serializeReview = async (rawReview,spotifyRepository) => {
    const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
    return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur)
}