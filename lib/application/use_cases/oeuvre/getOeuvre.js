const throwStatusCode = require("../utils/throwStatusCode.js");
const OeuvrePage = require("../../../domain/model/OeuvrePage.js");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer.js");
const fetchArtist = require("../spotify/FetchArtist.js");
const getAlbum = require("../spotify/getAlbum.js");
const getTrack = require("../spotify/getTrack.js");

module.exports = async (
  idOeuvre,
  userToken,
  {
    accessTokenManager,
    userRepository,
    spotifyRepository,
    reviewRepository,
    likeOeuvreRepository,
    oeuvreFavRepository,
    friendRepository,
  }
) => {
  const idUtilisateur = accessTokenManager.decode(userToken)?.value;
  const user = await userRepository.getByUser(idUtilisateur);
  if (!user)
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");

  let oeuvre;

  try {
    oeuvre = await getAlbum(idOeuvre, { spotifyRepository });
  } catch (errorAlbum) {
    try {
      oeuvre = await getTrack(idOeuvre, { spotifyRepository });
    } catch (errorTrack) {
      throwStatusCode(404, "L'ID de l'oeuvre est introuvable");
    }
  }

  const artistIds = oeuvre.artists.map((artist) => artist.id);

  const artists = await Promise.all(
    artistIds.map(async (id) => {
      return await fetchArtist(id, { spotifyRepository });
    })
  );

  const doesUserLikes = await likeOeuvreRepository.doesUserLikes(
    idUtilisateur,
    idOeuvre
  );
  const doesUserFav = await oeuvreFavRepository.oeuvreFavExists(
    idUtilisateur,
    idOeuvre
  );

  oeuvre.likeCount = await likeOeuvreRepository.getLikeCount(idOeuvre);
  oeuvre.reviewCount = await reviewRepository.getReviewCount(idOeuvre);
  oeuvre.rating = await reviewRepository.getOeuvreRating(idOeuvre);

  const reviewsByLike = await reviewRepository.getOeuvreReviews(
    1,
    3,
    true,
    false,
    false,
    [idOeuvre],
    idUtilisateur
  );
  const reviewsByTime = await reviewRepository.getOeuvreReviews(
    1,
    3,
    false,
    false,
    false,
    [idOeuvre],
    idUtilisateur
  );

  const reviewsByLikeSeri = await Promise.all(
    reviewsByLike.map(async (review) => {
      return reviewSerializer(
        review,
        idUtilisateur,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      );
    })
  );

  const reviewsByTimeSeri = await Promise.all(
    reviewsByTime.map(async (review) => {
      return reviewSerializer(
        review,
        idUtilisateur,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      );
    })
  );

  return new OeuvrePage(
    oeuvre,
    artists,
    reviewsByLikeSeri,
    reviewsByTimeSeri,
    doesUserLikes,
    doesUserFav
  );
};
