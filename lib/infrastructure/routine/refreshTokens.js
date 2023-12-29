const refreshToken = require("../../application/use_cases/spotify/RefreshToken")
module.exports = async ({spotifyRepository, userRepository}) => {
    const users = await userRepository.getSpotifyAuthUser()
    for(let i = 0; i<users.length; ++i){
        refreshToken(users[i].id_utilisateur,true,{spotifyRepository,userRepository})
    }
}