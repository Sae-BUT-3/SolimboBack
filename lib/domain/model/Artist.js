const {spotify_url} = require("./Track");
module.exports = class {
    constructor(artist) {
        this.id = artist?.id;
        this.name = artist.name;
        this.images = artist?.images;
        this.popularity = artist?.popularity
        this.genres = artist?.genres
        this.spotify_url = artist?.spotify_url
        this.type = "artist"
    }

}