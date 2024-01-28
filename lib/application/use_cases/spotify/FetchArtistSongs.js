const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")

module.exports = async (id, filter, limit, { spotifyRepository }) => {
    const album = "album"
    const single = "single"
    const compilation = "compilation"
    const appearsOn = "appears_on"

    let returnValue = []
    let artistSongs = {}


    try{
         artistSongs = await spotifyRepository.getSpotifyArtistSongs(id, filter, limit)
    }
    catch(error){
        throwStatusCode(400, `l'id : ${id} n'existe pas`)
    }

//console.log(artistSongs)

// console.log("LIGNE 20")

    //if (artistSongs?.total == 0) return returnValue // si aucun retour  

    const filterTab = filter.split(',')

//     artistSongs = {      
//     items: [
//     {
//       album_group: 'album',
//       album_type: 'album',
//       artists: [ [Object] ],
//       external_urls: {
//         spotify: 'https://open.spotify.com/album/1WVIJaAboRSwJOe4u0n0Q7'
//       },
//       href: 'https://api.spotify.com/v1/albums/1WVIJaAboRSwJOe4u0n0Q7',
//       id: '1WVIJaAboRSwJOe4u0n0Q7',
//       images: [ [Object], [Object], [Object] ],
//       name: 'GABRIEL',
//       release_date: '2022-03-25',
//       release_date_precision: 'day',
//       total_tracks: 12,
//       type: 'album',
//       uri: 'spotify:album:1WVIJaAboRSwJOe4u0n0Q7', 
//     }
// ]}

    // Recuperation selon le(s) filtre(s) et serialisation

    //recupere par defaut le include_groups : appears_on avec album
    const albumRaw = filterTab.includes(album) ? artistSongs?.items?.filter(item => item?.album_type === album) || [] : [];
    const albumSerialized = albumRaw.length > 0 ? albumRaw.map(item => SerializeAlbum(item)) : [];

    console.log("albumRaw : ", albumRaw)
    console.log("albumSerialized : ", albumSerialized)

    const singleRaw = filterTab.includes(single) ? artistSongs?.items?.filter(item => item?.album_type === single) || [] : [];
    // const singleSerialized = singleRaw.length > 0 ? singleRaw.map(item => SerializeTrack(item)) : [];
    const singleSerialized = singleRaw.length > 0 ? singleRaw.map(item => SerializeAlbum(item)) : [];

    const compilationRaw = filterTab.includes(compilation) ? artistSongs?.items?.filter(item => item?.album_type === compilation) || [] : [];
    const compilationSerialized = compilationRaw.length > 0 ? compilationRaw.map(item => SerializeAlbum(item)) : [];

    // autre champ utilise pour appearsOn : album_group
    const appearsOnRaw = filterTab.includes(appearsOn) ? artistSongs?.items?.filter(item => item?.album_group === appearsOn) || [] : [];
    const appearsOnialized = appearsOnRaw.length > 0 ? appearsOnRaw.map(item => SerializeAlbum(item)) : [];

    returnValue.push(...albumSerialized)
    returnValue.push(...singleSerialized)
    returnValue.push(...compilationSerialized)
    returnValue.push(...appearsOnialized)

    console.log("RETURN VALUE", returnValue) // a enlever 

    return returnValue
}