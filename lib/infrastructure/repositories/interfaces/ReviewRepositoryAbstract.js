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
    doesUserLikes(id_utilisateur,id_review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    likeReview(id_utilisateur,id_review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    unlikeReview(id_utilisateur,id_review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getLikes(id_utilisateur,id_review,page,pageSize) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getReviewByUserId(id_utilisateur,pageSize,orderByLike) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getOeuvreReviews(page,pageSize,orderByLike, fetchPrivate, ids_oeuvre,id) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    doesUserLike(id_utilisateur,id_review) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
    getOeuvreRating(id_oeuvre) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }

    getReviewCount(id_oeuvre) {
        throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
    }
};
