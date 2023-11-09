const serializeAlbum = require("../../../../lib/interfaces/serializers/AlbumSerializer")
const {
    albumRawOneArtist,
    expectedAlbumOneArtist,
    albumRawSeveralArtist,
    expectedAlbumSeveralArtist,
    albumRawNoArtist,
    expectedAlbumNoArtist
} = require("./fixtures/albumFixture")
describe('albumSerialize', () => {
    it("should return serialized album with one artist", ()=>{
        const result = serializeAlbum(albumRawOneArtist)
        expectedAlbumOneArtist.popularity = result.popularity // popularity is random
        expect(result).toEqual(expectedAlbumOneArtist)
    })
    it("should return serialized album with several artists", ()=>{
        const result = serializeAlbum(albumRawSeveralArtist)
        expectedAlbumSeveralArtist.popularity = result.popularity // popularity is random
        expect(result).toEqual(expectedAlbumSeveralArtist)
    })
    it("should return serialized album without artist", ()=>{
        const result = serializeAlbum(albumRawNoArtist)
        expectedAlbumNoArtist.popularity = result.popularity // popularity is random
        expect(result).toEqual(expectedAlbumNoArtist)
    })

});