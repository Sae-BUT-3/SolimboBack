// TrackSerializer.js
const Track = require("../../domain/model/Track");
const SerializeArtist = require("./ArtistSerializer");

const serializeTrack =  (trackRaw) => {
    const track = {
        id: trackRaw.id,
        name: trackRaw.name,
        album: undefined,
        artists:  trackRaw?.artists ? trackRaw?.artists?.map(item => SerializeArtist(item)) : undefined,
        spotify_url : trackRaw.external_urls.spotify,
        duration_ms: trackRaw.duration_ms,
        popularity: undefined,
    };
    return new Track(track)
};

module.exports = serializeTrack