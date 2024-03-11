module.exports = class {
    constructor(artist) {
        this.id = artist?.id;
        this.name = artist.name;
        this.image = artist?.image;
        this.popularity = artist?.popularity
        this.follower_count = artist?.follower_count
        this.genres = artist?.genres
        this.spotify_url = artist?.spotify_url
        this.type = "artist"
    }

}