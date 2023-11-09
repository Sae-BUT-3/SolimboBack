const SerializeTrack = require("../../../interfaces/serializers/TrackSerializer")
const SerializeAlbum = require("../../../interfaces/serializers/AlbumSerializer")
const SerializeArtist = require("../../../interfaces/serializers/ArtistSerializer")
const MAX_USER = 3
module.exports = async (query,filter, limit,allow_user, {spotifyRepository, userRepository}) =>{
    let limitSize = limit
    let users = []
    if(allow_user){

        users = await userRepository.getUsersByPseudo(query,MAX_USER)
        limitSize -= users.length
    }
    const searchListRaw = await spotifyRepository.getSpotifySearchList(query, filter, limitSize)
    let returnValue = []
    const tracks = searchListRaw?.tracks ?
        searchListRaw?.tracks?.items.map(item => SerializeTrack(item)) : []
    const albums = searchListRaw?.albums ?
        searchListRaw?.albums?.items.map(item => SerializeAlbum(item)) : []
    const artists = searchListRaw?.artists ?
        searchListRaw?.artists?.items.map(item => SerializeArtist(item)) : []
    returnValue.push(...tracks)
    returnValue.push(...albums)
    returnValue.push(...artists)
    returnValue.sort((item1,item2) => (item2.popularity - item1.popularity))
    returnValue.push(...users)
    return returnValue
}