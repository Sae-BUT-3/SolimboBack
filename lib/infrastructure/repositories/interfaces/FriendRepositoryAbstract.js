'use strict';

module.exports = class {

  persist(friendEntity) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getById(id_utilisateur, amiIdUtilisateur) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  getListFriendsById(id){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  removeFriendById(id_utilisateur, amiIdUtilisateur){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
 getRequestFriendsById(id){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  
  accept(id, amiIdUtilisateur) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
 
};
