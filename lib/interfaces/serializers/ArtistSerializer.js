const Artist = require("../../domain/model/Artist");
const serializeArtiste = (artisteRaw) => {
  const artist = {
    id: artisteRaw.id,
    name: artisteRaw.name,
    follower_count: artisteRaw?.follower_count,
    image:
      artisteRaw?.images && artisteRaw.images.length > 0
        ? artisteRaw.images[0].url
        : null,
    spotify_url: artisteRaw?.external_urls?.spotify,
    popularity: artisteRaw?.popularity,
    genres: artisteRaw?.genres,
  };
  return new Artist(artist);
};
module.exports = serializeArtiste;
