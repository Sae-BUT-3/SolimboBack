module.exports = class  {
    constructor(rawReview,oeuvre,utilisateur) {
        this.id_review = rawReview.id_review
        this.description = rawReview.description
        this.countlikes = rawReview.countlikes
        this.countComment = rawReview.countComment
        this.note = rawReview.note
        this.created_at = rawReview.createdAt
        this.oeuvre = oeuvre
        this.utilisateur = utilisateur
        this.type = rawReview.type
    }
}