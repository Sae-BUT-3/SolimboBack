const throwStatusCode = require("../../utils/throwStatusCode");
const UserPublic = require("../../../../domain/model/UserPublic")

module.exports = async (reviewId,userToken,page,pageSize,{accessTokenManager,userRepository,reviewRepository}) =>{
    if(userToken) {
        userToken = accessTokenManager.decode(userToken)?.value
    }
    const users = (await reviewRepository.getLikes(userToken,reviewId,page,pageSize)).map(item => new UserPublic(item))
    return users
}