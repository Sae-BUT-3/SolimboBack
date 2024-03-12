const UserPublic = require("../../../domain/model/UserPublic")
module.exports = async (confirmToken,{userRepository}) =>{
    const user = await userRepository.getByConfirmToken(confirmToken)
    return user ? new UserPublic(user) : null
}