module.exports = class {
    constructor(comment,utilisateur) {
        this.id_com = comment.id_com
        this.countLike = comment.countLike
        this.countComment = comment.countComment
        this.description = comment.description
        this.doesUserLike = !!comment.doesUserLike
        this.utilisateur = utilisateur
    }
}