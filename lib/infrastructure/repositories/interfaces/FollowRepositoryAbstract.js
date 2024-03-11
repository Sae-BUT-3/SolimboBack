'use strict';

module.exports = class {

  follow(userId, artistId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  unfollow(userId, artistId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  doesFollows(userId, artistId) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getFollowersCount(idArtist) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  } 
  getFriendsFollowing(idArtist,idUser,limit) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async getFriendsFollowingCount(idArtist,idUser) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
