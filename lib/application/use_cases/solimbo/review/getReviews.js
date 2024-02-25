const reviewSerializer = require("../../../../interfaces/serializers/ReviewSerializer");
module.exports = async (page,pageSize,orderByLike,userToken,{reviewRepository, spotifyRepository, accessTokenManager}) => {
     if(userToken)
          userToken = accessTokenManager.decode(userToken)?.value
     const rawReviews = await reviewRepository.getReviews(page,pageSize,orderByLike, false,userToken)
     const serializedReviews = []
     rawReviews.forEach(element => {
          serializedReviews.push(serializeReview(element,spotifyRepository))
     })
     return await Promise.all(serializedReviews)
}

const serializeReview = async (rawReview,spotifyRepository) => {
     const rawOeuvre = await spotifyRepository.getOeuvre(rawReview.id_oeuvre,rawReview.type)
     return reviewSerializer(rawReview,rawOeuvre,rawReview.utilisateur)
}