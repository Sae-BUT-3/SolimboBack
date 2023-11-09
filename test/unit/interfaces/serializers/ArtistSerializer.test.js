const {
    artistFixture,
    expectedFixture
} = require("./fixtures/artistFixture")
const serializeArtist = require("../../../../lib/interfaces/serializers/ArtistSerializer");

describe('albumSerialize', () => {
    it("should return serialized album with one artist", ()=>{
        const result = serializeArtist(artistFixture)
        expect(result).toEqual(expectedFixture)
    })

});