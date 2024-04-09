const throwStatusCode = require("../utils/throwStatusCode.js");
const OeuvrePage = require("../../../domain/model/OeuvrePage.js");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer.js");
const fetchArtist = require("../spotify/FetchArtist.js");
const getAlbum = require("../spotify/getAlbum.js");
const getTrack = require("../spotify/getTrack.js");


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
    
    const artistIds =  oeuvre.artists.map((artist)=>artist.id)

    const artists = await Promise.all(artistIds.map(async (id) => {
        return await fetchArtist(id, { spotifyRepository });
    }));
    
    // const artists = async artistId.map(id) => {
    //     await fetchArtist(id,{spotifyRepository})
    // }
    // const artist = await fetchArtist(artistId,{spotifyRepository})

    const doesUserLikes = await likeOeuvreRepository.doesUserLikes(idUtilisateur,idOeuvre)
    const doesUserFav = await oeuvreFavRepository.oeuvreFavExists(idUtilisateur,idOeuvre)
   
    oeuvre.likeCount = await likeOeuvreRepository.getLikeCount(idOeuvre)
    oeuvre.reviewCount = await reviewRepository.getReviewCount(idOeuvre)
    oeuvre.rating = await reviewRepository.getOeuvreRating(idOeuvre)

    const reviewsByLike =  await reviewRepository.getOeuvreReviews(1,3,true,false,idOeuvre,idUtilisateur)
    const reviewsByTime = await reviewRepository.getOeuvreReviews(1,3,false,false,idOeuvre,idUtilisateur)

   const reviewsByLikeSeri = await Promise.all(
        reviewsByLike.map(async (review) => {
            const doesUserLikeReview = await reviewRepository.doesUserLike(idUtilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLikeReview)
        })
    )

    const reviewsByTimeSeri = await Promise.all(
        reviewsByTime.map(async (review) => {
            const doesUserLikeReview = await reviewRepository.doesUserLike(idUtilisateur,review.id_review)
            const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
            if(rawOeuvre.error)
                throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
            return reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLikeReview)
        })
    )

    return new OeuvrePage(oeuvre, artists, reviewsByLikeSeri, reviewsByTimeSeri, doesUserLikes, doesUserFav)
}