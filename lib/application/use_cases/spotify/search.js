const getSpotifyAccessToken = require("../utils/GetSpotifyAccessToken")
const axios = require('axios')
module.exports = async (query,filter, limit) =>{
    const spotifyAccessToken = await getSpotifyAccessToken(process.env.CLIENT_ID,process.env.CLIENT_SECRET)
    console.log("test")
    console.log(spotifyAccessToken)
    axios.get('https://api.spotify.com/v1/search', {
        headers: {
            'Authorization': `Bearer ${spotifyAccessToken}`,
        },
        params: {
            q: query,
            type: filter, // Vous pouvez également rechercher des albums, des artistes, etc.
            limit : limit
        },
    })
        .then((response) => {
            console.log(response)
        })
}