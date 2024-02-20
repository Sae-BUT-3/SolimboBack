const Artist = require("../../domain/model/Artist")
const serializeArtiste = (artisteRaw) => {
    const artist = {
        id: artisteRaw.id,
        name: artisteRaw.name,
        images: artisteRaw?.images ? artisteRaw.images[0] : null,
        spotify_url : artisteRaw?.external_urls?.spotify,
        popularity: artisteRaw?.popularity,
        genres : artisteRaw?.genres
    }
    return new Artist(artist)
}
module.exports=serializeArtiste