module.exports = class {
    constructor(comment,utilisateur) {
        this.id_com = comment.id_com
        this.id_review = comment.id_review
        this.id_reponse = comment.id_reponse
        this.description = comment.description
        this.countLike = comment.countLike
        this.countComment = comment.countComment
        this.createdAt = comment.createdAt
        this.utilisateur = utilisateur
    }
}