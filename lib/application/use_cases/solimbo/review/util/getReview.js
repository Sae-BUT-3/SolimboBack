const throwStatusCode = require("../../../utils/throwStatusCode");

module.exports = async(idReview,userToken,{accessTokenManager,friendRepository,reviewRepository}) => {
    const rawReview = await reviewRepository.getById(idReview)
    if(!rawReview)
        throwStatusCode(404,"la review n'existe pas")
    if(rawReview.utilisateur.is_private) {
        let valid = false
        if(userToken) {
            const id = accessTokenManager.decode(userToken)?.value
            if(await friendRepository.areFriends(id,rawReview.utilisateur.id_utilisateur))
                valid = true
        }
        if(!valid)
            throwStatusCode(403, "l'utilisateur est en privé")
    }
    return rawReview
}