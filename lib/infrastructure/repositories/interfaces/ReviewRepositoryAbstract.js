'use strict';

module.exports = class {

    persist(review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    async getByUserAndId(id_oeuvre,id_utilisateur) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

};
