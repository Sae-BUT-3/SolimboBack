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
const CommentRepository= require('../repositories/CommentRepository');
const OeuvreFavRepository= require('../repositories/OeuvreFavRepository');
const TranslateRepository = require('../repositories/TranslateRepository');
const OeuvreRepository = require('../repositories/OeuvreRepository');
const NotificationRepository= require('../repositories/NotificationRepository')

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
    likeOeuvreRepository: new LikeOeuvreRepository(),
    commentRepository: new CommentRepository(),
    translateRepository: new TranslateRepository(),
    oeuvreRepository: new OeuvreRepository(),
    notificationRepository: new NotificationRepository(),
  };
}

module.exports = buildBeans();
