const throwStatusCode = require("../utils/throwStatusCode");
module.exports = async (OeuvreId, userToken, {reviewRepository, userRepository, accessTokenManager}) => {
    let id = null
    if (userToken) {
        id = accessTokenManager.decode(userToken)?.value
    }
    if(! await userRepository.getByUser(id)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")

    const count = await reviewRepository.getReviewCount(OeuvreId)
    
    return count
}
