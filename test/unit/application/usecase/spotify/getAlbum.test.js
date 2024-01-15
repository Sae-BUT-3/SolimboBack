const getAlbum = require("../../../../../lib/application/use_cases/spotify/getalbum")

const {
    albumRawOneArtist,
    expectedAlbumOneArtist,
    albumRawSeveralArtist,
    expectedAlbumSeveralArtist,
    albumRawNoArtist,
    expectedAlbumNoArtist
} = require("../../../interfaces/serializers/fixtures/albumTrackFixture")
const catchError = require("../utils/catchError");
const mockSpotifyRepository = {}


describe('get an album usecase', () => {
    it("should return an album with one artist", async ()=>{
        mockSpotifyRepository.getSpotifyAlbums = jest.fn((id) =>{
            return albumRawOneArtist
        })
        const result = await getAlbum(
            "45i3tB9z0dgJ33olyrsLUz",
            {spotifyRepository : mockSpotifyRepository}
        )
        result.popularity = 0
        expect(result).toEqual(expectedAlbumOneArtist)
    })
    it("should return an album with one artist", async ()=>{
        mockSpotifyRepository.getSpotifyAlbums = jest.fn((id) =>{
            return albumRawSeveralArtist
        })
        const result = await getAlbum(
            "45i3tB9z0dgJ33olyrsLUz",
            {spotifyRepository : mockSpotifyRepository}
        )
        result.popularity = 0
        expect(result).toEqual(expectedAlbumSeveralArtist)
    })
    it("should return an album with one artist", async ()=>{
        mockSpotifyRepository.getSpotifyAlbums = jest.fn((id) =>{
            return albumRawNoArtist
        })
        const result = await getAlbum(
            "45i3tB9z0dgJ33olyrsLUz",
            {spotifyRepository : mockSpotifyRepository}
        )
        result.popularity = 0
        expect(result).toEqual(expectedAlbumNoArtist)
    })
    it("should throw error", async ()=>{
        mockSpotifyRepository.getSpotifyAlbums = jest.fn((id) =>{
            return {error : {status: 400, message: "msg"}}
        })

        const error = await catchError(async ()=>{
            await getAlbum(
                "45i3tB9z0dgJ33olyrsLUz",
                {spotifyRepository : mockSpotifyRepository}
            )
        })
        expect(error.code).toBe(400)
    })
});
//see