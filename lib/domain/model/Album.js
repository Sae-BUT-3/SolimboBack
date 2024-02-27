module.exports = class {
    constructor(album) {
        this.id = album.id
        this.name = album.name
        this.popularity = album.popularity
        this.release_date = album.release_date
        this.total_tracks = album.total_tracks
        this.image = album.image
        this.spotify_url = album.spotify_url
        this.artists = album.artists
        this.tracks = album.tracks
        this.genres = album.genres
        this.type = album.type
    }
}