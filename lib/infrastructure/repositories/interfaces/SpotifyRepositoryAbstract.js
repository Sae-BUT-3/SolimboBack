'use strict';

module.exports = class {

  getSpotifyAccessToken() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async getSpotifySearchList(query,filter,limit){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  refreshToken(token) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getToken(code) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getAccountData(accessToken){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }



};
