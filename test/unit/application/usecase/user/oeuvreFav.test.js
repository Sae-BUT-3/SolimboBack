const OeuvreFav = require("../../../../../lib/application/use_cases/user/oeuvreFav.js");
const throwStatusCode = require("../../../../../lib/application/use_cases/utils/throwStatusCode.js");
const catchError = require("../utils/catchError.js");
const {
  albumRawOneArtist,
} = require("../../../interfaces/serializers/fixtures/albumFixture.js");
const {
  rawTrackWithOneArtist,
} = require("../../../interfaces/serializers/fixtures/albumTrackFixture.js");

describe("OeuvreFav Test", () => {
  const idOeuvre = "idOeuvre";
  const userToken = "token";

  const mockAccesTokenManager = {};
  const mockSpotifyRepository = {};
  const mockUserRepository = {};
  const mockOeuvreFavRepository = {};
  const serviceLocator = {
    userRepository: mockUserRepository,
    oeuvreFavRepository: mockOeuvreFavRepository,
    accessTokenManager: mockAccesTokenManager,
    spotifyRepository: mockSpotifyRepository,
  };

  describe("invalid and valid cases", () => {
    it("should throw error bad auth token", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => null);
      const error = await catchError(async () => {
        await OeuvreFav(userToken, "track", idOeuvre, serviceLocator);
      });
      expect(error.code).toBe(401);
    });

    // aucune oeuvre de trouve
    it("should throw incrorrect id oeuvre error", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });

      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        throwStatusCode(404, "invalid id");
      });
      const error = await catchError(async () => {
        await OeuvreFav(userToken, "track", idOeuvre, serviceLocator);
      });
      expect(error.code).toBe(404);

      expect(mockSpotifyRepository.getOeuvre).toHaveBeenCalledTimes(1);
    });

    // plus de 3 oeuvres favorites avec album
    it("should throw maximal add", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });
      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(albumRawOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );

      const error = await catchError(async () => {
        await OeuvreFav(userToken, "track", idOeuvre, serviceLocator);
      });

      expect(mockOeuvreFavRepository.ajoutPossible).toHaveBeenCalledTimes(1);
      expect(error.code).toBe(403);
    });

    // plus de 3 oeuvres favorites avec track
    it("should throw maximal add", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });

      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(rawTrackWithOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );

      const error = await catchError(async () => {
        await OeuvreFav(userToken, "track", idOeuvre, serviceLocator);
      });

      expect(mockSpotifyRepository.getOeuvre).toHaveBeenCalledTimes(1);

      expect(mockOeuvreFavRepository.ajoutPossible).toHaveBeenCalledTimes(1);
      expect(error.code).toBe(403);
    });

    // ajout réussie avec album
    it("should put an album", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });
      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(albumRawOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn(
        (id_utilisateur, idOeuvre) => true
      );
      mockOeuvreFavRepository.addOeuvrefav = jest.fn();

      const result = await OeuvreFav(
        userToken,
        "track",
        idOeuvre,
        serviceLocator
      );

      expect(mockOeuvreFavRepository.ajoutPossible).toHaveBeenCalledTimes(1);
      expect(mockOeuvreFavRepository.addOeuvrefav).toHaveBeenCalledTimes(1);
      expect(result).toEqual(true);
    });

    // ajout réussie avec track
    it("should put an track", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });

      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(rawTrackWithOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => false
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn(
        (id_utilisateur, idOeuvre) => true
      );
      mockOeuvreFavRepository.addOeuvrefav = jest.fn();

      const result = await OeuvreFav(
        userToken,
        "track",
        idOeuvre,
        serviceLocator
      );

      expect(mockSpotifyRepository.getOeuvre).toHaveBeenCalledTimes(1);

      expect(mockOeuvreFavRepository.ajoutPossible).toHaveBeenCalledTimes(1);
      expect(mockOeuvreFavRepository.addOeuvrefav).toHaveBeenCalledTimes(1);
      expect(result).toEqual(true);
    });

    // supression réussite d'un album
    it("should remove an album ", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });
      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(albumRawOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => true
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn();
      mockOeuvreFavRepository.addOeuvrefav = jest.fn();
      mockOeuvreFavRepository.deleteOeuvrefav = jest.fn();

      const result = await OeuvreFav(
        userToken,
        "track",
        idOeuvre,
        serviceLocator
      );

      expect(mockOeuvreFavRepository.ajoutPossible).not.toHaveBeenCalled();
      expect(mockOeuvreFavRepository.deleteOeuvrefav).toHaveBeenCalledTimes(1);
      expect(result).toEqual(false);
    });

    // supression réussite d'une track
    it("should remove a track ", async () => {
      mockAccesTokenManager.decode = jest.fn((userToken) => 1);
      mockUserRepository.getByUser = jest.fn((userToken) => {
        return {
          id_utilisateur: 1,
        };
      });

      mockSpotifyRepository.getOeuvre = jest.fn((idOeuvre) => {
        return Promise.resolve(rawTrackWithOneArtist);
      });
      mockOeuvreFavRepository.oeuvreFavExists = jest.fn(
        (id_utilisateur, idOeuvre) => true
      );
      mockOeuvreFavRepository.ajoutPossible = jest.fn();
      mockOeuvreFavRepository.addOeuvrefav = jest.fn();
      mockOeuvreFavRepository.deleteOeuvrefav = jest.fn();

      const result = await OeuvreFav(
        userToken,
        "track",
        idOeuvre,
        serviceLocator
      );

      expect(mockSpotifyRepository.getOeuvre).toHaveBeenCalledTimes(1);

      expect(mockOeuvreFavRepository.ajoutPossible).not.toHaveBeenCalled();
      expect(mockOeuvreFavRepository.deleteOeuvrefav).toHaveBeenCalledTimes(1);
      expect(result).toEqual(false);
    });
  });
});
