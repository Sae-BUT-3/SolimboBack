module.exports = class {
    constructor(oeuvre, artist, reviewsByLike, reviewsByTime, doesUserLikes, doesUserFav){
        this.oeuvre = oeuvre
        this.artist = artist
        this.reviewsByLike = reviewsByLike
        this.reviewsByTime = reviewsByTime
        this.doesUserLikes = doesUserLikes
        this.doesUserFav = doesUserFav
    }
}