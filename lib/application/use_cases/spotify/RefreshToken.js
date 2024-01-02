module.exports = (id,instant_refresh,{spotifyRepository,userRepository}) => {
    const action = async ()=>{
        const user = await userRepository.getByUser(id)
        const {access_token} = await spotifyRepository.refreshToken(user.refresh_token)
        user.token = access_token
        userRepository.updateUser(user)
    }
    if(instant_refresh){
        action()
    }
    setInterval(()=>{
        action()
    },3500*1000)
}