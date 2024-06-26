const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const PublicComment = require("../../../domain/model/PublicComment");
const UserPublic = require("../../../domain/model/UserPublic");
const throwStatusCode = require("../utils/throwStatusCode");

module.exports = async (
  id_com,
  page,
  pageSize,
  orderByLike,
  userToken,
  lang,
  {
    reviewRepository,
    commentRepository,
    accessTokenManager,
    userRepository,
    friendRepository,
    spotifyRepository,
    translateRepository,
  }
) => {
  const id_utilisateur = accessTokenManager.decode(userToken)?.value;
  if (!(await userRepository.getByUser(id_utilisateur)))
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  const mainComment = await commentRepository.getById(id_com);
  if (!mainComment) throwStatusCode(404, "commentaire introuvable");
  const commentsRaw = await commentRepository.getCommentsComments(
    id_com,
    id_utilisateur,
    true,
    page,
    pageSize,
    orderByLike
  );
  const review = await reviewRepository.getById(mainComment.id_review);
  let previousComments = [];
  let nextCommentsId = mainComment.id_reponse;
  while (nextCommentsId) {
    previousComments.push(await commentRepository.getById(nextCommentsId));
    nextCommentsId = previousComments.at(-1).id_reponse;
  }
  return await serialize(
    id_utilisateur,
    mainComment,
    previousComments,
    commentsRaw,
    review,
    lang,
    {
      spotifyRepository,
      friendRepository,
      commentRepository,
      reviewRepository,
      translateRepository,
    }
  );
};

const serialize = async (
  id_utilisateur,
  comment,
  previousComments,
  comments,
  review,
  lang,
  {
    spotifyRepository,
    friendRepository,
    commentRepository,
    reviewRepository,
    translateRepository,
  }
) => {
  const serializeReview = async () => {
    return !review.utilisateur.is_private ||
      friendRepository.areFriends(
        id_utilisateur,
        review.utilisateur.id_utilisateur
      )
      ? reviewSerializer(
          review,
          id_utilisateur,
          comments,
          spotifyRepository,
          reviewRepository,
          friendRepository
        )
      : {
          private: true,
        };
  };
  const serializeComment = async () => {
    const doesUserLike = await commentRepository.doesUserLike(
      id_utilisateur,
      comment.id_com
    );
    comment.doesUserLike = doesUserLike;
    if (lang) {
      comment.translatedDescription = await translateRepository.translate(
        comment.description,
        lang
      );
    }
    return !comment.utilisateur.is_private ||
      friendRepository.areFriends(
        id_utilisateur,
        comment.utilisateur.id_utilisateur
      )
      ? new PublicComment(comment, new UserPublic(comment.utilisateur))
      : {
          private: true,
        };
  };
  const serializedPreviousComments = Promise.all(
    previousComments.map(async (comment) => {
      const doesUserLike = await commentRepository.doesUserLike(
        id_utilisateur,
        comment.id_com
      );
      comment.doesUserLike = doesUserLike;
      return !comment.utilisateur.is_private ||
        friendRepository.areFriends(
          id_utilisateur,
          comment.utilisateur.id_utilisateur
        )
        ? new PublicComment(comment)
        : {
            private: true,
          };
    })
  );
  const serializedComments = Promise.all(
    comments.map(async (comment) => {
      const doesUserLike = await commentRepository.doesUserLike(
        id_utilisateur,
        comment.id_com
      );
      comment.doesUserLike = doesUserLike;
      return !comment.utilisateur.is_private ||
        friendRepository.areFriends(
          id_utilisateur,
          comment.utilisateur.id_utilisateur
        )
        ? new PublicComment(comment, new UserPublic(comment.utilisateur))
        : {
            private: true,
          };
    })
  );
  const promise = await Promise.all([
    serializeReview(),
    serializeComment(),
    serializedPreviousComments,
    serializedComments,
  ]);
  return {
    review: promise[0],
    comment: promise[1],
    previousComments: promise[2],
    comments: promise[3],
  };
};
