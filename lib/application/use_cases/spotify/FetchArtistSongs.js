const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")

module.exports = async (id, filter, limit, {spotifyRepository, userRepository}) =>{
    const album ="album"
    const single ="single"
    const compilation ="compilation"
   // const appearsOn ="appears_on"

    let returnValue = []
    console.log(filter)

   const artistSongs = await spotifyRepository.getSpotifyArtistSongs(id, filter, limit)
   if(artistSongs?.total == 0) return returnValue
   
   const filterTab = filter.split(',')

   //recupere aussi le inclide_grou^s : appears_on
   const albumRaw = filterTab.includes(album) ? artistSongs?.items?.filter(item => item.album_type === album) || [] : [];
   const albumSerialized = albumRaw.length > 0 ? albumRaw.map(item => SerializeAlbum(item)) : [];

   const singleRaw = filterTab.includes(single) ? artistSongs?.items?.filter(item => item.album_type === single) || [] : [];
   const singleSerialized = singleRaw.length > 0 ? singleRaw.map(item => SerializeTrack(item)) : [];

   const compilationRaw = filterTab.includes(compilation) ? artistSongs?.items?.filter(item => item.album_type === compilation) || [] : [];
   console.log(compilationRaw)
   const compilationerialized = compilationRaw.length > 0 ? compilationRaw.map(item => SerializeAlbum(item)) : [];

//    const appearsOnRaw = filterTab.includes(appearsOn) ? artistSongs?.items?.filter(item => item.album_type === appearsOn) || [] : [];
//    const appearsOnSerialized = appearsOnRaw.length > 0 ? appearsOnRaw.map(item => SerializeAlbum(item)) : [];

        
    returnValue.push(...albumSerialized)
    returnValue.push(...singleSerialized)
    returnValue.push(...compilationerialized)
    //returnValue.push(...appearsOnSerialized)

    console.log("retuenvalue: ", returnValue)

    return returnValue
}