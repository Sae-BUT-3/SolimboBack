module.exports = class  {
    constructor(rawReview,oeuvre,utilisateur,doesUserLike) {
        console.log(rawReview)
        this.id_review = rawReview.id_review
        this.description = rawReview.description
        this.countlikes = rawReview.countlikes
        this.countComment = rawReview.countComment
        this.doesUserLike = doesUserLike
        this.note = rawReview.note
        this.created_at = rawReview.created_at
        this.oeuvre = oeuvre
        this.utilisateur = utilisateur
        this.type = rawReview.type
    }
}