const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")
const SerializeSearchItem = require("../../../interfaces/serializers/SerializeSearchItem")
const MAX_USER = 3
module.exports = async (query,filter, limit, {spotifyRepository, userRepository}) =>{
    let limitSize = limit
    let users = []
    filter = filter.split(",")
    if(filter.includes("user")){
        filter = filter.filter(item => item !== "user");
        users = await userRepository.getUsersByPseudo(query,MAX_USER)
        console.log(users)
        limitSize -= users.length
    }

    const searchListRaw = filter.length>0
        ? await spotifyRepository.getSpotifySearchList(query, filter.join(","), limitSize)
        : {}
    let returnValue = []

    // Formatage des objets
    const tracks = searchListRaw?.tracks ?
        searchListRaw?.tracks?.items.map(item => SerializeTrack(item)) : []

    const albums = searchListRaw?.albums ?
        searchListRaw?.albums?.items.map(item => SerializeAlbum(item)) : []
    const artists = searchListRaw?.artists ?
        searchListRaw?.artists?.items.map(item => SerializeArtist(item)) : []
    if(artists[0])
        artists[0].popularity = 101

    returnValue.push(...tracks)
    returnValue.push(...albums)
    returnValue.push(...artists)
    returnValue.sort((item1,item2) => (item2.popularity - item1.popularity))
    if(returnValue.length> limitSize)
        returnValue = returnValue.splice(0,limitSize)
    returnValue.push(...users)
    
    return returnValue.map(item => SerializeSearchItem(item))
}