const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")

module.exports = async (id, filter, limit, {spotifyRepository, userRepository}) =>{
    filter = filter.split(",") //??? 
    console.log(filter)
    console.log(filter.join(","))
   const artistSongs = await spotifyRepository.getSpotifyArtistSongs(id, filter.join(","), limit)
   
   if (filter == "album"){
    const albumRaw = artistSongs?.items?.filter(item => item.album_type === "album") || [];
   }

   //const albumRaw = artistSongs.filter(val  => artistSongs?.items ? artistSongs?.items?.album_type =="album" : []) 
    console.log("TEST")

    console.log(albumRaw)
    console.log("TEST 2")

    let returnValue = []

  
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
    return albumRaw
}