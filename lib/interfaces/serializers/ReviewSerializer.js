const Album = require("../../domain/model/Album");
const artistSerializer = require("./ArtistSerializer");
const trackSerializer = require("./TrackSerializer");
const albumSerializer = require("./AlbumSerializer");
const UserPublic = require("../../domain/model/UserPublic")
const ReviewPublic = require("../../domain/model/ReviewPublic");
const serializeReview = (rawReview,rawOeuvre,utilisateur,doesUserLike) => {
    switch (rawReview.type){
        case 'artist':
            rawOeuvre = artistSerializer(rawOeuvre)
            break
        case 'track':
            rawOeuvre = trackSerializer(rawOeuvre)
            break
        case 'album':
            rawOeuvre = albumSerializer(rawOeuvre)
            break
        default:
            rawOeuvre = null
    }
    return new ReviewPublic(rawReview, rawOeuvre, new UserPublic(utilisateur),doesUserLike)
}

module.exports = serializeReview