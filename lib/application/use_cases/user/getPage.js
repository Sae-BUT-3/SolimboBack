const throwStatusCode = require("../utils/throwStatusCode");
const oeuvreSerializer = require("../../../interfaces/serializers/OeuvreSerializer");
const UserPublic = require("../../../domain/model/UserPublic");
const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
module.exports = async (
  id_utilisateur,
  page,
  pageSize,
  orderByLike,
  user_token,
  {
    userRepository,
    friendRepository,
    oeuvreFavRepository,
    reviewRepository,
    accessTokenManager,
    spotifyRepository,
    likeOeuvreRepository,
    followRepository
  }
) => {
  const current_user = await userRepository.getByUser(
    accessTokenManager.decode(user_token)?.value
  );
  console.log(id_utilisateur)
  if (!current_user)
    throwStatusCode(401, "votre token d'authentification n'est pas le bon");
  const selected_user = await userRepository.getByUser(id_utilisateur);
  if (!selected_user) 
    throwStatusCode(404, "l'utilisateur n'existe pas");

  const isCurrent = id_utilisateur == current_user.id_utilisateur;
  const doesFollows = await friendRepository.doesFollows(
    id_utilisateur,
    current_user.id_utilisateur
  );
  const relation = await friendRepository.getFollowInfo(
    id_utilisateur,
    current_user.id_utilisateur
  );
  if (selected_user.is_private && !doesFollows) {
    return {
      user: new UserPublic(selected_user),
      forbidden: true,
      relation,
    };
  }
  const idOeuvres = await oeuvreFavRepository.getOeuvresFav(id_utilisateur);
  const idLikeOeuvres = await likeOeuvreRepository.getOeuvreLikes(id_utilisateur);
  const count = await reviewRepository.getCountReviewByUserId(id_utilisateur);
  const reviewsRaw = await reviewRepository.getReviewByUserId(
    id_utilisateur,
    page,
    pageSize,
    orderByLike
  );
  const usersfollowed = await friendRepository.getListFriendsById(id_utilisateur)
  usersfollowed.map(async (item) => {
    const areFriends = await friendRepository.areFriends(id_utilisateur, item.id_utilisateur);
    const userPublicFriends = new UserPublic(item)
    return {
        ...userPublicFriends,
        areFriends: areFriends
    };
  });
  const artistfollowed = await followRepository.getArtistFollowed(id_utilisateur);
  const allFollowed = [...usersfollowed, ...artistfollowed];

  const followers = await friendRepository.getListFollowers(id_utilisateur);
  followers.map((item) => new UserPublic(item));

  const oeuvres = await Promise.all(
    idOeuvres.map(async (oeuvre) => {
      const SpotifyOeuvre = await spotifyRepository.getOeuvre(
        oeuvre.id_oeuvre,
        oeuvre.type
      );
      SpotifyOeuvre.rating = await reviewRepository.getOeuvreRating(
        oeuvre.id_oeuvre
      );
      return oeuvreSerializer( await SpotifyOeuvre, oeuvre.type);
    })
  );

  const likeOeuvres = await Promise.all(
    idLikeOeuvres.map(async (oeuvre) => {
      const SpotifyOeuvre = await spotifyRepository.getOeuvre(
        oeuvre.id_oeuvre,
        oeuvre.type
      );
      SpotifyOeuvre.rating = await reviewRepository.getOeuvreRating(
        oeuvre.id_oeuvre
      );
      return oeuvreSerializer( await SpotifyOeuvre, oeuvre.type);
    })
  );

  const reviews = [];
  reviewsRaw.forEach((element) => {
    reviews.push(
      reviewSerializer(
        element,
        id_utilisateur,
        undefined,
        spotifyRepository,
        reviewRepository,
        friendRepository
      )
    );
  });  

  console.log({
    user: new UserPublic(selected_user),
    forbidden: selected_user.is_private,
    isCurrent : isCurrent,
    relation: relation,
    oeuvres : oeuvres || [],
    likeOeuvres: likeOeuvres || [],
    reviews: reviews || [],
    reviewsCount: count
  })
  return {
    user: new UserPublic(selected_user),
    allFollowed : allFollowed,
    followers: followers,
    forbidden: selected_user.is_private,
    isCurrent : isCurrent,
    relation: relation,
    oeuvres : oeuvres || [],
    likeOeuvres: likeOeuvres || [],
    reviews: reviews || [],
    reviewsCount: count
  };
};
