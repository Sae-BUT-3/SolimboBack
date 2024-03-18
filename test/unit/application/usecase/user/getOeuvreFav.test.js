const getOeuvresFav = require("../../../../../lib/application/use_cases/user/getOeuvresFav.js")
const throwStatusCode = require("../../../../../lib/application/use_cases/utils/throwStatusCode.js")
const catchError = require("../utils/catchError.js")

describe("getOeuvresFav Test", () => {
    const userToken = 'token'

    const mockAccesTokenManager = {}
    const mockSpotifyRepository = {}
    const mockUserRepository = {}
    const mockOeuvreFavRepository = {}
    const serviceLocator = {
        userRepository: mockUserRepository,
        oeuvreFavRepository: mockOeuvreFavRepository,
        accessTokenManager: mockAccesTokenManager,
        spotifyRepository: mockSpotifyRepository,
    }

    describe("invalid and valid cases", () => {

        it("should throw error bad auth token", async () => {
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((userToken) => null)
            const error = await catchError(async () => {
                await getOeuvresFav(userToken, serviceLocator)
            })
            expect(error.code).toBe(401)
        })

        it("should send an array with oeuvre fav id", async () => {
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockOeuvreFavRepository.getOeuvresFav = jest.fn((userToken) => {
                return [1, 2, 3]
            })

            const result = await getOeuvresFav(userToken, serviceLocator)

            expect(result).toEqual([1, 2, 3])
            expect(mockOeuvreFavRepository.getOeuvresFav).toHaveBeenCalledTimes(1)
        })

        it("should send a empty array", async () => {
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((userToken) => {
                return {
                    id_utilisateur: 1
                }
            })
            mockOeuvreFavRepository.getOeuvresFav = jest.fn((userToken) => {
                return []
            })

            const result = await getOeuvresFav(userToken, serviceLocator)

            expect(result).toEqual([])
            expect(mockOeuvreFavRepository.getOeuvresFav).toHaveBeenCalledTimes(1)
        })
    })
})
