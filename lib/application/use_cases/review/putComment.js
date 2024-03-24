const throwStatusCode = require("../utils/throwStatusCode");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const getReview = require("./util/getReview");
module.exports = async (userToken, idReview,description, {userRepository, accessTokenManager,friendRepository,reviewRepository,commentRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    await getReview(idReview,userToken,{accessTokenManager,friendRepository,reviewRepository})
    return await commentRepository.persist(idReview,description,id_utilisateur,id_utilisateur)

}
