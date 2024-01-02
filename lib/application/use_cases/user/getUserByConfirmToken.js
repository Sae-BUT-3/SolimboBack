const UserPublic = require("../../../domain/model/UserPublic")
module.exports = async (confirmToken,{userRepository}) =>{
    const user = userRepository.getUserByConfirmToken(confirmToken)
    return user ? new UserPublic(user) : null
}