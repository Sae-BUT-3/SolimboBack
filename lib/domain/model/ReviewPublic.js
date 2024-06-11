module.exports = class {
  constructor(rawReview, oeuvre, utilisateur, doesUserLike, comments) {
    this.id_review = rawReview.id_review;
    this.description = rawReview.description;
    this.translatedDescription = rawReview.translatedDescription;
    this.countlike = rawReview.countlike;
    this.countComment = rawReview.countComment;
    this.doesUserLike = doesUserLike;
    this.note = rawReview.note;
    this.createdAt = rawReview.createdAt;
    this.oeuvre = oeuvre;
    this.utilisateur = utilisateur;
    this.comments = comments;
    this.made_by_friend = rawReview.made_by_friend;
    this.type = rawReview.type;
  }
};
