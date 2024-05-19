const artistSerializer = require("./ArtistSerializer");
const trackSerializer = require("./TrackSerializer");
const albumSerializer = require("./AlbumSerializer");
const oeuvreSerializer = (rawOeuvre, type) => {
  console.log(type);
  switch (type) {
    case "artist":
      return artistSerializer(rawOeuvre);
    case "track":
      return trackSerializer(rawOeuvre);
    case "single":
    case "compilation":
    case "album":
      return albumSerializer(rawOeuvre);
    default:
      return null;
  }
};

module.exports = oeuvreSerializer;
