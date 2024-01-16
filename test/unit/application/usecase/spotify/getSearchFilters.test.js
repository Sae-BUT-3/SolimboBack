const getSearchFilters = require("../../../../../lib/application/use_cases/spotify/getSearchFilters")


describe('getSearchFilters usecase', () => {
    it("should return list of filters", async ()=>{
        const expectSearchFixture = [
            {
                label: 'Musique',
                id: 'track'
            },
            {
                label: 'Artiste',
                id: 'artist'
            },
            {
                label: 'Album',
                id: 'album'
            },
            {
                label: 'Utilisateur',
                id: 'user'
            },
        ]
        const result = getSearchFilters()
        expect(result).toEqual(expectSearchFixture)
    })
});