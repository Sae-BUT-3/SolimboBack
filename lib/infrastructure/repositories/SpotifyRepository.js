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

    async getSpotifyAlbums(id){
        return axios.get('https://api.spotify.com/v1/albums/'+ id, {
            validateStatus: function (status) {
                return true;
            },
            headers: {
                'Authorization': `Bearer ${await this.getSpotifyAccessToken()}`,
            }
        })
            .then((response) => {
                return response.data
            })
    }
    async getSpotifyArtist(id){
        return axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            validateStatus: function (status) {
                return true;
            },
            headers: {
                'Authorization': `Bearer ${await this.getSpotifyAccessToken()}`,
            },
        })
            .then((response) => {
                return response.data
            })
    }

    async getSpotifyTracks(id){
        return axios.get('https://api.spotify.com/v1/tracks/'+ id, {
            validateStatus: function (status) {
                return true;
            },
            headers: {
                'Authorization': `Bearer ${await this.getSpotifyAccessToken()}`,
            }
        })
            .then((response) => {
                return response.data
            })
    }

    refreshToken(token) {
        const payload = new URLSearchParams()
        payload.append('grant_type', 'refresh_token');
        payload.append('refresh_token', token);
        return axios.post('https://accounts.spotify.com/api/token',payload,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: this.client_id,
                password: this.client_secret,
            },
        })
            .then((response) => {
                return response.data
            })
    }
    getToken(code,redirectURI) {
        const payload = new URLSearchParams()
        payload.append('grant_type','authorization_code')
        payload.append('redirect_uri',redirectURI)
        payload.append('code',code)
        return axios.post('https://accounts.spotify.com/api/token',payload,
            {
                validateStatus: function (status) {
                    return true;
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(this.client_id + ':' + this.client_secret).toString('base64'))
                },
            })
            .then((response) => {
                return response.data
            })
    }
    getAccountData(accessToken) {
        return axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.data
            })
    }
};
