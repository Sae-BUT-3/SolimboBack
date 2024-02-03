const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const throwStatusCode = require("../utils/throwStatusCode")

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
        console.log("18 erreur")
        throwStatusCode(400, `l'id : ${id} n'existe pas`)
    }

    const filterTab = filter.split(',')

    // Recuperation selon le(s) filtre(s) et serialisation

    //recupere par defaut le include_groups : appears_on avec album
    const albumRaw = filterTab.includes(album) ? artistSongs?.items?.filter(item => item?.album_group === album) || [] : [];
    const albumSerialized = albumRaw.length > 0 ? albumRaw.map(item => SerializeAlbum(item)) : [];

    const singleRaw = filterTab.includes(single) ? artistSongs?.items?.filter(item => item?.album_group === single) || [] : [];
    const singleSerialized = singleRaw.length > 0 ? singleRaw.map(item => SerializeAlbum(item)) : [];

    const compilationRaw = filterTab.includes(compilation) ? artistSongs?.items?.filter(item => item?.album_group === compilation) || [] : [];
    const compilationSerialized = compilationRaw.length > 0 ? compilationRaw.map(item => SerializeAlbum(item)) : [];
   
    // autre champ utilise pour appearsOn : album_group
    const appearsOnRaw = filterTab.includes(appearsOn) ? artistSongs?.items?.filter(item => item?.album_group === appearsOn) || [] : [];
    const appearsOnialized = appearsOnRaw.length > 0 ? appearsOnRaw.map(item => SerializeAlbum(item)) : [];

    returnValue.push(...albumSerialized)
    returnValue.push(...singleSerialized)
    returnValue.push(...compilationSerialized)
    returnValue.push(...appearsOnialized)

    return returnValue
}