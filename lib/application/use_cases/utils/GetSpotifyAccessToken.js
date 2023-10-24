const axios = require('axios')
module.exports = async (client_id, client_secret) => {
    return axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'client_credentials',
        },
        auth: {
            username: client_id,
            password: client_secret,
        },
    }).then((response) => {
        return response.data.access_token
    })
};