const throwStatusCode = require("../utils/throwStatusCode.js");
const OeuvrePage = require("../../../domain/model/OeuvrePage.js");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer.js");

module.exports = async (idOeuvre, userToken, {accessTokenManager,userRepository, spotifyRepository, reviewRepository,likeOeuvreRepository, oeuvreFavRepository}) => {
    const idUtilisateur = accessTokenManager.decode(userToken)?.value
    const user = await userRepository.getByUser(idUtilisateur)
    if(!user) throwStatusCode(401,"votre token d'authentification n'est pas le bon")

    let oeuvre

    try {
        oeuvre = await getAlbum(idOeuvre, {spotifyRepository});
    } catch (errorAlbum) {
        try {
            oeuvre = await getTrack(idOeuvre, {spotifyRepository});
        } catch (errorTrack) {
            throwStatusCode(404, "L'ID de l'oeuvre est introuvable");
        }
    }
    const artist = oeuvre.artist

    const doesUserLikes = await likeOeuvreRepository.doesUserLikes(idUtilisateur,idOeuvre)
    const doesUserFav = await oeuvreFavRepository.oeuvreFavExists(idUtilisateur,idOeuvre)
   
    oeuvre.likeCount = await likeOeuvreRepository.getLikeCount(idOeuvre)
    oeuvre.reviewCount = await reviewRepository.getReviewCount(idOeuvre)
    oeuvre.rating = await reviewRepository.getOeuvreRating(idOeuvre)

    const reviewsByLike =  await reviewRepository.getOeuvreReviews(1,3,true,false,idOeuvre,idUtilisateur)
    const reviewsByTime = await reviewRepository.getOeuvreReviews(1,3,false,false,idOeuvre,idUtilisateur)

    reviewsByLike = await Promise.all(
        reviewsByLike.map(async (review) => {
            const doesUserLikeReview = await reviewRepository.doesUserLike(idUtilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLikeReview)
        })
    )

    reviewsByTime = await Promise.all(
        reviewsByTime.map(async (review) => {
            const doesUserLikeReview = await reviewRepository.doesUserLike(idUtilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLikeReview)
        })
    )
    return new OeuvrePage(oeuvre, artist, reviewsByLike, reviewsByTime, doesUserLikes, doesUserFav)
}