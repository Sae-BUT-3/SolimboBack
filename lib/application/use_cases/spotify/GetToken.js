const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (code,{spotifyRepository}) => {
    const {access_token, refresh_token,error} = await spotifyRepository.getToken(code)
    if(error)
        throwStatusCode(400,error)
    return {
        token:access_token,
        refresh_token
    }
}