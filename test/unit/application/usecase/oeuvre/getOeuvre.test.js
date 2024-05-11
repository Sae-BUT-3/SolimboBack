const getOeuvre = require("./../../../../../lib/application/use_cases/oeuvre/getOeuvre")
const catchError = require("../utils/catchError")
const {
    mockUser,
    mockArtist,
    mockUserPrivate,
    mockAlbumRaw,
    mockLikedReview,
    mockCommentedReview,
    mockOeuvreReviewSpotify,
    expectedArtist
} = require('../fixtures/getOeuvreFixture')

describe("getOeuvre Test", ()=>{
    const mockReviewRepository = {}
    const mockAccesTokenManager = {}
    const mockUserRepository = {}
    const mockSpotifyRepository = {}
    //const mockFollowRepository = {}
    const mocklikeOeuvreRepository = {}
    const mockoeuvreFavRepository = {}

    const serviceLocator = {
        reviewRepository: mockReviewRepository,
        accessTokenManager: mockAccesTokenManager,
        userRepository: mockUserRepository,
        spotifyRepository: mockSpotifyRepository,
        //followRepository: mockFollowRepository,
        likeOeuvreRepository : mocklikeOeuvreRepository,
        oeuvreFavRepository : mockoeuvreFavRepository
    }
    describe("valid cases", ()=>{
        it("should return valid oeuvre with 1 artist", async ()=>{ 
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((idUtilisateur) => mockUser)
            // mockFollowRepository.getFollowersCount = jest.fn((artistId) => 100)
            // mockFollowRepository.getFriendsFollowing = jest.fn((artistId,userId,limit) => [mockUserPrivate])
            // mockFollowRepository.getFriendsFollowingCount = jest.fn((artistId,userId) => 1)
            mockSpotifyRepository.getSpotifyAlbums = jest.fn((idOeuvre) => {
                return Promise.resolve(mockAlbumRaw);
            });
            mockSpotifyRepository.getSpotifyTracks = jest.fn((idOeuvre));
            mockSpotifyRepository.getSpotifyArtist = jest.fn((idArtist) => mockArtist);

            mocklikeOeuvreRepository.doesUserLikes = jest.fn((idUtilisateur,idOeuvre)).mockReturnValue(false)
            mockoeuvreFavRepository.oeuvreFavExists = jest.fn((idUtilisateur,idOeuvre)).mockReturnValue(false)

            mocklikeOeuvreRepository.getLikeCount = jest.fn((idOeuvre) => 9)
            mockReviewRepository.getReviewCount = jest.fn((idOeuvre) => 2)
            mockReviewRepository.getOeuvreRating = jest.fn(() => 1)
            mockReviewRepository.getOeuvreReviews = jest.fn().mockReturnValueOnce([mockLikedReview]).mockReturnValueOnce([mockCommentedReview])
            mockreviewRepository.doesUserLikes = jest.fn().mockReturnValue(false)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockOeuvreReviewSpotify)

            //mockSpotifyRepository.getSpotifyArtist = jest.fn((artistId) => mockArtist)
           // mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((artistId,filter,limit) => mockAlbumRaw)
           // mockReviewRepository.getOeuvreRating = jest.fn((id) => 1)
            //mockReviewRepository.getReviewCount = jest.fn((id) => 2)
            //mockReviewRepository.getOeuvreReviews = jest.fn().mockReturnValueOnce([mockLikedReview]).mockReturnValueOnce([mockCommentedReview])
           // mockreviewRepository.doesUserLikes = jest.fn().mockReturnValue(true)
          //  mockFollowRepository.doesFollows = jest.fn().mockReturnValue(true)
           // mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue(mockOeuvreReviewSpotify)
            const result = await getOeuvre(1,'token', serviceLocator)
            result.albums[0].popularity = 64
            expect(result).toEqual(expectedOeuvre)
        })
    })
    describe("invalid cases", ()=>{
        it("should throw error bad auth token", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => null)
            const error = await catchError(async ()=>{
                await getArtist(1,'token', serviceLocator)
            })
            expect(error.code).toBe(401)
        })
        it("should throw error artist not found", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => mockUser)
            mockSpotifyRepository.getSpotifyArtist  = jest.fn((artistId) => {
                return {
                    error: {
                        status: 400,
                        message: "message",
                    }
                }
            })
            const error = await catchError(async ()=>{
                await getArtist(1,'token', serviceLocator)
            })
            expect(error.code).toBe(400)
        })

        it("should throw error oeuvre not found 1", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => mockUser)
            mockFollowRepository.getFollowersCount = jest.fn((artistId) => 100)
            mockFollowRepository.getFriendsFollowing = jest.fn((artistId,userId,limit) => [mockUserPrivate])
            mockFollowRepository.getFriendsFollowingCount = jest.fn((artistId,userId) => 1)
            mockSpotifyRepository.getSpotifyArtist = jest.fn((artistId) => mockArtist)
            mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((artistId,filter,limit) => mockAlbumRaw)
            mockReviewRepository.getOeuvreRating = jest.fn((id) => 1)
            mockReviewRepository.getReviewCount = jest.fn((id) => 2)
            mockReviewRepository.getOeuvreReviews = jest.fn().mockReturnValueOnce([mockLikedReview]).mockReturnValueOnce([mockCommentedReview])
            mockreviewRepository.doesUserLikes = jest.fn().mockReturnValue(true)
            mockFollowRepository.doesFollows = jest.fn().mockReturnValue(true)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValue({
                error: {
                    status: 400,
                    message: "message",
                }
            })

            const error = await catchError(async ()=>{
                await getArtist(1,'token', serviceLocator)
            })
            expect(error.code).toBe(400)
        })

        it("should throw error oeuvre not found 2", async ()=>{
            mockAccesTokenManager.decode = jest.fn((userToken) => 1)
            mockUserRepository.getByUser = jest.fn((id) => mockUser)
            mockFollowRepository.getFollowersCount = jest.fn((artistId) => 100)
            mockFollowRepository.getFriendsFollowing = jest.fn((artistId,userId,limit) => [mockUserPrivate])
            mockFollowRepository.getFriendsFollowingCount = jest.fn((artistId,userId) => 1)
            mockSpotifyRepository.getSpotifyArtist = jest.fn((artistId) => mockArtist)
            mockSpotifyRepository.getSpotifyArtistSongs = jest.fn((artistId,filter,limit) => mockAlbumRaw)
            mockReviewRepository.getOeuvreRating = jest.fn((id) => 1)
            mockReviewRepository.getReviewCount = jest.fn((id) => 2)
            mockReviewRepository.getOeuvreReviews = jest.fn().mockReturnValueOnce([mockLikedReview]).mockReturnValueOnce([mockCommentedReview])
            mockreviewRepository.doesUserLikes = jest.fn().mockReturnValue(true)
            mockFollowRepository.doesFollows = jest.fn().mockReturnValue(true)
            mockSpotifyRepository.getOeuvre = jest.fn().mockReturnValueOnce(mockOeuvreReviewSpotify).mockReturnValue({
                error: {
                    status: 400,
                    message: "message",
                }
            })

            const error = await catchError(async ()=>{
                await getArtist(1,'token', serviceLocator)
            })
            expect(error.code).toBe(400)
        })
        
    })
    
})