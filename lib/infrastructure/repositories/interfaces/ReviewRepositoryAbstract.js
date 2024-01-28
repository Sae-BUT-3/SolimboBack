'use strict';

module.exports = class {

    persist(review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getByUserAndId(id_oeuvre,id_utilisateur) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    delete(id_oeuvre,id_utilisateur) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getTypeReviewID(label){
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getById(id_review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getReviews(page,pageSize,orderByLike) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
};
