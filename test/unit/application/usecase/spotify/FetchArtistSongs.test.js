const { VERSION } = require("underscore");
const catchError = require("../utils/catchError")

const FetchArtistSongs = require("../../../../../lib/application/use_cases/spotify/FetchArtistSongs")
const {
    songsRawAlbumArtist, 
    expectedAlbumArtist,
    songsRawSingleArtist,
    expectedSingleArtist,
    songsRawCompilationArtist,
    expectedCompilationArtist,
    songsRawAppearsOnArtist,
    expectedAppearsOnArtist
} = require("../../../interfaces/serializers/fixtures/artistAlbumsFixture")

const songsRawAll = {
    items: [
      songsRawAlbumArtist.items[0],
      songsRawSingleArtist.items[0],
      songsRawCompilationArtist.items[0],
      songsRawAppearsOnArtist.items[0]
    ],
  }
  
  const expectedFixturesAll = [
    expectedAlbumArtist[0],
    expectedSingleArtist[0],
    expectedCompilationArtist[0],
    expectedAppearsOnArtist[0]
  ];
      
  const songsRawAlbumSingle = {
    items: [
      songsRawAlbumArtist.items[0],
      songsRawSingleArtist.items[0]
    ]
  }
  
  const expectedFixturesAlbumSingle = [
    expectedAlbumArtist[0],
    expectedSingleArtist[0]
  ];
  

const mockSpotifyRepository = {}

const id = "57TzZhbqvYoUBzJSVKFVlG"
const album ="album"
const single ="single"
const compilation ="compilation"
const appearsOn = "appears_on"


describe('FetchArtistSongs usecase', () => {
    it("should return a serialized album item", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawAlbumArtist 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            album,
            1,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedAlbumArtist)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, album, 1) 

    })

    it("should return a serialized album type single item", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawSingleArtist 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            single,
            1,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedSingleArtist)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, single, 1) 
    })



    it("should return a serialized album type compilation item", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawCompilationArtist 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            compilation,
            1,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedCompilationArtist)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, compilation, 1) 
    })

    it("should return a serialized album type appears_on item", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawAppearsOnArtist 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            appearsOn,
            1,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedAppearsOnArtist)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, appearsOn, 1) 
    })

    it("should return 4 serialized album's type album, single, compilation and appears_on items", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawAll 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            "album,single,compilation,appears_on",
            4,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedFixturesAll)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id, "album,single,compilation,appears_on" , 4) 
    })

    it("should return 2 serialized album's type album and single", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            return songsRawAlbumSingle 
        })
        const result = await FetchArtistSongs( // fetchArtist metier, serialize est fait a la fin 
            id,
            "album,single",
            2,
            {spotifyRepository : mockSpotifyRepository}) // va utiliser la fct getSpotifyArtistSongs de mockSpotifyRepository
            expect(result).toEqual(expectedFixturesAlbumSingle)
            expect(mockSpotifyRepository.getSpotifyArtistSongs).toHaveBeenCalledWith(id,"album,single" , 2) 
    })

console.log("ONE PIECE")
    it("should return throw an error 400", async ()=>{
        mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((id, filter, limit) =>{
            throw new Error('test error')
        })

        const error = await catchError(async ()=> {
            await FetchArtistSongs(id, "single", 1, {spotifyRepository : mockSpotifyRepository}) 
        })
        expect(error.code).toBe(400)
    })
});