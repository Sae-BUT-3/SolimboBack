const UserPublic = require("../../../domain/model/UserPublic")
module.exports = async (pseudo,{userRepository}) =>{
    const user = await userRepository.getByEmailOrPseudo(pseudo,pseudo)
    return user ? new UserPublic(user) : null
}