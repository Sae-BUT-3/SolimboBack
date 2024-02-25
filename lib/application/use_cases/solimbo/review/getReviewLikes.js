const throwStatusCode = require("../../utils/throwStatusCode");
const UserPublic = require("../../../../domain/model/UserPublic")
const getReview = require("./util/getReview")

module.exports = async (reviewId,userToken,page,pageSize,{accessTokenManager,reviewRepository,friendRepository}) =>{
    const reviewTest = await getReview(reviewId,userToken, {accessTokenManager,friendRepository,reviewRepository})
    if(userToken) {
        userToken = accessTokenManager.decode(userToken)?.value
    }
    const users = (await reviewRepository.getLikes(userToken,reviewId,page,pageSize)).map(item => new UserPublic(item))
    return users
}