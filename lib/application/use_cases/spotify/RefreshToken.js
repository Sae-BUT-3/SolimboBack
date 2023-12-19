module.exports = async (id,{spotifyRepository,userRepository}) => {
    setInterval(async ()=>{
        const user = await userRepository.getByUser(id)
        console.log(user)

        const {access_token} = await spotifyRepository.refreshToken(user.refresh_token)
        user.token = access_token
        userRepository.updateUser(user)
    },3500*1000)
}