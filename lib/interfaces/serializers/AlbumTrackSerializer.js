// TrackSerializer.js
const Track = require("../../domain/model/Track");
const SerializeArtist = require("./ArtistSerializer");

const serializeTrack =  (trackRaw) => {
    const track = {
        id: trackRaw.id,
        name: trackRaw.name,
        spotify_url : trackRaw?.external_urls.spotify,
        duration_ms: trackRaw.duration_ms,
        rating: trackRaw?.rating,
        likeCount: trackRaw?.likeCount,
        reviewCount: trackRaw?.reviewCount,
    };
    return new Track(track)
};

module.exports = serializeTrack