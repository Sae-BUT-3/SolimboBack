'use strict';


const UserRepository= require('../repositories/UserRepository');
const spotifyRepository= require('../repositories/SpotifyRepository');
const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
const documentRepository= require('../repositories/DocumentRepository');
const NodemailerRepository= require('../repositories/NodemailerRepository');
const FollowRepository= require('../repositories/FollowRepository');
const FriendRepository= require('../repositories/FriendRepository');
const ReviewRepository= require('../repositories/ReviewRepository');
const LikeOeuvreRepository= require('../repositories/LikeOeuvreRepository');
const OeuvreFavRepository= require('../repositories/OeuvreFavRepository');


function buildBeans() {
  return {
    accessTokenManager: new JwtAccessTokenManager(),
    userRepository: new UserRepository(),
    spotifyRepository:  new spotifyRepository(process.env.CLIENT_ID,process.env.CLIENT_SECRET),
    documentRepository: new documentRepository(),
    mailRepository:  new NodemailerRepository(process.env.MAILER_SERVICE,process.env.MAILER_EMAIL,process.env.MAILER_PASS),
    followRepository: new FollowRepository(),
    friendRepository: new FriendRepository(),
    oeuvreFavRepository: new OeuvreFavRepository(),
    reviewRepository: new ReviewRepository(),
    likeOeuvreRepository: new LikeOeuvreRepository()
  };
}

module.exports = buildBeans();
