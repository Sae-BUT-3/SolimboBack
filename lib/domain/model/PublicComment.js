module.exports = class {
    constructor(comment,utilisateur) {
        this.id_com = comment.id_com
        this.countLike = comment.countLike
        this.countComment = comment.countComment
        this.description = comment.description
        this.translatedDescription = comment.translatedDescription
        this.doesUserLike = !!comment.doesUserLike
        this.createdAt = comment.createdAt
        this.utilisateur = utilisateur
    }
}