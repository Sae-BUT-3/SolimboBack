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

  async getSpotifyArtist(id){
    return axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': `Bearer ${await this.getSpotifyAccessToken()}`,
      },
    })
    .then((response) => {
      return response.data
    })
  }
};
