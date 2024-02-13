module.exports = async (user,instant_refresh,{spotifyRepository,userRepository}) => {
    const action = async ()=>{
        const {access_token} = await spotifyRepository.refreshToken(user.refresh_token)
        user.token = access_token
        userRepository.updateUser(user)
    }
    if(instant_refresh){
        try{
            await action()
        }catch(e){
            user.refresh_token = null
            user.token = null
            await userRepository.updateUser(user)
        }
    }
    setInterval(async ()=>{
        action()
    },3500*1000)
}