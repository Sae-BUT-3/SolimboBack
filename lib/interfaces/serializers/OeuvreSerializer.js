const artistSerializer = require("./ArtistSerializer");
const trackSerializer = require("./TrackSerializer");
const albumSerializer = require("./AlbumSerializer");
const oeuvreSerializer = (rawOeuvre,type) => {
    switch (type){
        case 'artist':
            rawOeuvre = artistSerializer(rawOeuvre)
            break
        case 'track':
            rawOeuvre = trackSerializer(rawOeuvre)
            break
        case 'album':
            rawOeuvre = albumSerializer(rawOeuvre)
            break
        case 'single':
            rawOeuvre = albumSerializer(rawOeuvre)
            break
        default:
            rawOeuvre = null
    }
}

module.exports = oeuvreSerializer