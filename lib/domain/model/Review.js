module.exports = class  {
    constructor(rawReview, utilisateur,type) {

        this.id_review = rawReview.id_review
        this.id_oeuvre = rawReview.id_oeuvre
        this.countlikes = rawReview.dataValues.countLike
        this.countComment = rawReview.dataValues.countComment
        this.description = rawReview.description
        this.note = rawReview.note
        this.createAt = rawReview.createdAt
        this.updated_at = rawReview.updatedAt
        this.type = type

        this.utilisateur = utilisateur
    }
}