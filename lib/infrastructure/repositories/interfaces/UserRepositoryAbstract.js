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

};
