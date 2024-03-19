module.exports = class {
    constructor(comment,utilisateur) {
        this.id = comment.id_com
        this.description = comment.description
        this.utilisateur = utilisateur
    }
}