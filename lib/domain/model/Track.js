module.exports = class {
  constructor(track) {
    this.id = track.id;
    this.name = track.name;
    this.album = track.album;
    this.artists = track.artists;
    this.duration_ms = track.duration_ms;
    this.popularity = track.popularity;
    this.spotify_url = track.spotify_url;
    this.release_date = track.release_date;
    this.image = track.album?.image;
    this.type = "track";
  }
};
