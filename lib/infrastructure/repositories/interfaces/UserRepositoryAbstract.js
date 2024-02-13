'use strict';

module.exports = class {

  persist(domainUser) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async getUsersByPseudo(oseudo,limit) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

  async getByEmailOrPseudo(email,pseudo){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getByIdent(ident){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async getByUser(id){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async getPreviewPath(id){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  async addPreviewPath(id,path){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  updateUser(user){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getSpotifyAuthUser(){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  removeUserByConfirmToken(confirmToken){
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  removeUncheckedAccounts() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getByConfirmToken(token) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  clearResetTokens() {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  getByResetToken(resetToken) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
  setPrivateStatus(id) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }
};
