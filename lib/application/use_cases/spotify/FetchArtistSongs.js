const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")
module.exports = async (id, filter, limit, {spotifyRepository, userRepository}) =>{
    //let limitSize = limit
    const artistSongs = await spotifyRepository.getSpotifyArtistSongs(query, filter, limit)

 //   const artistSongs = await spotifyRepository.getSpotifyArtistSongs(query, filter, limitSize)
    console.log(artistSongs)
    //let returnValue = []

    // Formatage des objets
    // const tracks = artistSongs?.items ?
    // artistSongs?.tracks?.items.map(item => SerializeTrack(item)) : []

    // const albums = searchListRaw?.albums ?
    //     searchListRaw?.albums?.items.map(item => SerializeAlbum(item)) : []

    // const artists = searchListRaw?.artists ?
    //     searchListRaw?.artists?.items.map(item => SerializeArtist(item)) : []
        
    // returnValue.push(...tracks)
    // returnValue.push(...albums)
    // returnValue.push(...artists)
    // returnValue.sort((item1,item2) => (item2.popularity - item1.popularity))
    // returnValue.push(...users)
    return returnValue
}