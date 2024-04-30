const artistSerializer = require("./ArtistSerializer");
const trackSerializer = require("./TrackSerializer");
const albumSerializer = require("./AlbumSerializer");
const UserPublic = require("../../domain/model/UserPublic");
const ReviewPublic = require("../../domain/model/ReviewPublic");
const serializeReview = async (
  rawReview,
  id_utilisateur,
  comments,
  spotifyRepository,
  reviewRepository,
  friendRepository
) => {
  let doesUserLike = false;
  if (id_utilisateur) {
    doesUserLike = await reviewRepository.doesUserLike(
      id_utilisateur,
      rawReview.id_review
    );
  }
  let rawOeuvre = await spotifyRepository.getOeuvre(
    rawReview.id_oeuvre,
    rawReview.type
  );
  if (rawOeuvre.error)
    throwStatusCode(rawOeuvre.error.status, rawOeuvre.error.message);
  rawReview.made_by_friend = await friendRepository.areFriends(
    id_utilisateur,
    rawReview.utilisateur.id_utilisateur
  );
  switch (rawReview.type) {
    case "artist":
      rawOeuvre = artistSerializer(rawOeuvre);
      break;
    case "track":
      rawOeuvre = trackSerializer(rawOeuvre);
      break;
    case "album":
      rawOeuvre = albumSerializer(rawOeuvre);
      break;
    case "single":
      rawOeuvre = albumSerializer(rawOeuvre);
      break;
    default:
      rawOeuvre = null;
  }
  return new ReviewPublic(
    rawReview,
    rawOeuvre,
    new UserPublic(rawReview.utilisateur),
    doesUserLike,
    comments
  );
};

module.exports = serializeReview;
