const Album = require("../../domain/model/Album");
const artistSerializer = require("./ArtistSerializer");
const trackSerializer = require("./ArtistSerializer");
const albumSerializer = require("./AlbumSerializer");
const UserPublic = require("../../domain/model/UserPublic")
const Review = require("../../domain/model/Review");
const serializeReview = (rawReview,rawOeuvre,utilisateur) => {
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
    return new Review(rawReview, rawOeuvre, new UserPublic(utilisateur))
}

module.exports = serializeReview