'use strict';

const axios = require("axios");
const spotifyRepositoryAbstract = require('./interfaces/SpotifyRepositoryAbstract')
module.exports = class extends spotifyRepositoryAbstract{

  constructor(client_id,client_secret)  {
    super();
    this.client_id = client_id
    this.client_secret = client_secret
  }


  getSpotifyAccessToken() {

    return axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      auth: {
        username: this.client_id,
        password: this.client_secret,
      },
    }).then((response) => {
      return response.data.access_token
    })
  }
  async getSpotifySearchList(query,filter,limit){
    return axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${await this.getSpotifyAccessToken()}`,
      },
      params: {
        q: query,
        type: filter,
        limit : limit
      },
    })
        .then((response) => {
          return response.data
        })
  }
  getAuthURL(scopes){
    return axios.get('https://accounts.spotify.com/authorize', {
      params: {
        client_id: this.client_id,
        response_type: "code",
        redirect_uri : "localhost:3001/documentation",
        scope: scopes.join(' ')
      },
    })
        .then((response) => {
          console.log("test")
          console.log(response.data)
          return response.data
        })
 }
};
