"use strict";

module.exports = class {
  persist(id_review, description, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  getReviewComments(
    id_review,
    id_utilisateur,
    fetchPrivate,
    page,
    pageSize,
    orderByLike
  ) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  getCommentsComments(
    id_reponse,
    id_utilisateur,
    fetchPrivate,
    page,
    pageSize,
    orderByLike
  ) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  delete(id_comment, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  doesUserLikes(id_comment, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  like(id_comment, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
  unlike(id_comment, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  canDelete(id_comment, id_utilisateur) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
