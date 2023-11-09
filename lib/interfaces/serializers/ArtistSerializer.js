const Artist = require("../../domain/model/Artist")
const serializeArtiste = (artisteRaw) => {
    const artist = {
        id: artisteRaw.id,
        name: artisteRaw.name,
        images: artisteRaw?.images,
        spotify_url : artisteRaw?.external_urls?.spotify,
        popularity: artisteRaw?.popularity,
        genres : artisteRaw?.genres
    }
    return new Artist(artist)
}
module.exports=serializeArtiste