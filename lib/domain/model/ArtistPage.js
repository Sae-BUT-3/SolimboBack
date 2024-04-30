module.exports = class {
  constructor(
    artist,
    albums,
    friends_followers,
    reviewsByLike,
    reviewsByTime,
    reviewsByFriends,
    doesUserFollow
  ) {
    this.artist = artist;
    this.albums = albums;
    this.friends_followers = friends_followers;
    this.reviewsByLike = reviewsByLike;
    this.reviewsByTime = reviewsByTime;
    this.reviewsByFriends = reviewsByFriends;
    this.doesUserFollow = doesUserFollow;
  }
};
