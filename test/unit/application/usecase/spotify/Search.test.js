const search = require("../../../../../lib/application/use_cases/spotify/Search")
const {
    mockUser,
    SpotifyRepositoryFixture,
    expectedSearchResult,
    expectedSearchResultWithUsers
} = require("../fixtures/searchFixture")
const Search = require("../../../../../lib/application/use_cases/spotify/Search");

const mockSpotifyRepository = {}
const mockUserRepository = {}
mockUserRepository.getUsersByPseudo = jest.fn((query,MAX_USER) =>{
    return [mockUser]
})
mockSpotifyRepository.getSpotifySearchList = jest.fn((query,filter,limit) =>{
    return SpotifyRepositoryFixture
})
describe('Search usecase', () => {
    it("should return item list sorted by popularity without user", async ()=>{
        const result = await Search(
            "test",
            "filter",
            4,
            {spotifyRepository : mockSpotifyRepository,userRepository: mockUserRepository})
        expect(result).toEqual(expectedSearchResult)
        expect(mockSpotifyRepository.getSpotifySearchList).toHaveBeenCalledWith("test","filter",4)
    })
    it("should return item list sorted by popularity with user", async ()=>{
        const result = await Search(
            "test",
            "user,track",
            4,
            {spotifyRepository : mockSpotifyRepository,userRepository: mockUserRepository})
        expect(result).toEqual(expectedSearchResultWithUsers)
        expect(mockSpotifyRepository.getSpotifySearchList).toHaveBeenCalledWith("test","track",3)
    })
});
//see