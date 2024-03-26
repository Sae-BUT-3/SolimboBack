const throwStatusCode = require("../utils/throwStatusCode")
const oeuvreSerializer = require("../../../interfaces/serializers/OeuvreSerializer")
const UserPublic = require("../../../domain/model/UserPublic")
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer")
module.exports = async (id_utilisateur,page,pageSize, orderByLike, user_token, {userRepository,friendRepository,oeuvreFavRepository,reviewRepository,accessTokenManager,spotifyRepository}) => {
    const current_user = await userRepository.getByUser(accessTokenManager.decode(user_token)?.value)

    if(!current_user )
        throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const selected_user = await userRepository.getByUser(id_utilisateur)
    if(!selected_user)
        throwStatusCode(404,"l'utilisateur n'existe pas")
    const isCurrent =  id_utilisateur == current_user.id_utilisateur
    const areFriends =  await friendRepository.areFriends(id_utilisateur,current_user.id_utilisateur)

    if(selected_user.is_private && !areFriends)
        throwStatusCode(403,"l'utilisateur est en privé")

    const relation =  await friendRepository.getFollowInfo(id_utilisateur,current_user.id_utilisateur)
    const idOeuvres = await oeuvreFavRepository.getOeuvresFav(id_utilisateur)
    const reviewsRaw = await reviewRepository.getReviewByUserId(id_utilisateur,page,pageSize, orderByLike)

    const oeuvresPromise = Promise.all(idOeuvres.map(async (oeuvre) => {
        const SpotifyOeuvre = await spotifyRepository.getOeuvre(oeuvre.id_oeuvre,oeuvre.type)
        return oeuvreSerializer(SpotifyOeuvre,oeuvre.type)
    }))

    const reviewsPromise = Promise.all(reviewsRaw.map(async (review) => {
        const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
        if(rawOeuvre.error)
            throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
        const doesUserLike = await reviewRepository.doesUserLike(id_utilisateur,review.id_review)
        return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLike)
    }))
    

    const [
        oeuvres,
        reviews
    ] = await Promise.all([
        oeuvresPromise,
        reviewsPromise
    ])
    return {
        user: new UserPublic(selected_user),
        isCurrent,
        relation,
        oeuvres,
        reviews
    }
}