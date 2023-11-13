module.exports = class {
    constructor(album) {
        this.id = album.id
        this.name = album.name
        this.popularity = album.popularity
        this.release_date = album.release_date
        this.total_tracks = album.total_tracks
        this.images = album.images
        this.spotify_url = album.spotify_url
        this.artists = album.artists
        this.genres = album.genres
        this.type = "album"
    }
}