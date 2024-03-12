const UserPublic = require("../../../domain/model/UserPublic")
module.exports = async (pseudo,{userRepository}) =>{
    const user = await userRepository.getByEmailOrPseudo(pseudo,pseudo)
    console.log(!!user)
    console.log(user)
    return user ? new UserPublic(user) : null
}