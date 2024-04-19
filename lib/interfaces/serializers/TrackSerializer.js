// TrackSerializer.js
const Track = require("../../domain/model/Track");
const SerializeAlbum = require("./AlbumSerializer");
const SerializeArtist = require("./ArtistSerializer");

const serializeTrack = (trackRaw) => {
  const album = trackRaw?.album ? SerializeAlbum(trackRaw.album) : undefined;
  const track = {
    id: trackRaw.id,
    name: trackRaw.name,
    album: album,
    release_date: trackRaw?.album?.release_date,
    artists: trackRaw?.artists
      ? trackRaw?.artists?.map((item) => SerializeArtist(item))
      : undefined,
    spotify_url: trackRaw.external_urls.spotify,
    duration_ms: trackRaw?.duration_ms,
    popularity: trackRaw?.popularity ? trackRaw?.popularity : undefined,
  };

  return new Track(track);
};

module.exports = serializeTrack;
