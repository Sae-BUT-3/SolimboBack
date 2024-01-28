const throwStatusCode = require("../../utils/throwStatusCode");
const Review = require("../../../../domain/model/Review")
const UserPublic = require("../../../../domain/model/UserPublic")
const trackSerializer = require("../../../../interfaces/serializers/ArtistSerializer")
const artistSerializer = require("../../../../interfaces/serializers/ArtistSerializer")
const albumSerializer = require("../../../../interfaces/serializers/AlbumSerializer")
module.exports = async (idReview, userToken, {accessTokenManager, userRepository,reviewRepository,spotifyRepository})=> {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    if(!await reviewRepository.delete(idReview,id_utilisateur)) throwStatusCode(403,"de n'est pas votre post")
}