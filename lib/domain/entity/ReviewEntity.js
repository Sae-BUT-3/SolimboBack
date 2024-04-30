const Joi = require("joi");
const putReview = Joi.object().keys({
  idOeuvre: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(1).max(1500).required(),
  note: Joi.number().greater(-1).less(6).required(),
  type: Joi.string()
    .required()
    .custom((value, helpers) => {
      const allowedValues = [
        "track",
        "album",
        "artist",
        "single",
        "compilation",
      ];
      return allowedValues.includes(value)
        ? value
        : helpers.error("any.invalid");
    }),
});
const deleteReview = Joi.object().keys({
  idReview: Joi.string().min(1).max(50).required(),
});

const getReviewParams = Joi.object().keys({
  id: Joi.string().min(1).max(50).required(),
});
const getReviewQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
});
const getReviews = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
  friendsOnly: Joi.boolean(),
});

const likeReviewParams = Joi.object().keys({
  id: Joi.number().required(),
});

const likeReviewQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
});

const userReviewParams = Joi.object().keys({
  id: Joi.string().max(50).required(),
});

const userReviewQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
});

const oeuvreReviewParams = Joi.object().keys({
  id: Joi.string().max(50).required(),
});

const oeuvreReviewQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
  friendsOnly: Joi.boolean(),
});

const artistReviewParams = Joi.object().keys({
  id: Joi.string().max(50).required(),
});

const artistReviewQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
  friendsOnly: Joi.boolean(),
});

const getTimelineQuery = Joi.object().keys({
  page: Joi.number().integer().min(1).required(),
  pageSize: Joi.number().integer().min(1).required(),
  orderByLike: Joi.boolean(),
});
const putCommentParams = Joi.object().keys({
  id: Joi.string().max(50).required(),
});

const putCommentPayload = Joi.object().keys({
  description: Joi.string().max(1500).required(),
});
module.exports = {
  putReview,
  deleteReview,
  getReviewParams,
  getReviews,
  likeReviewParams,
  likeReviewQuery,
  userReviewParams,
  userReviewQuery,
  putCommentParams,
  oeuvreReviewQuery,
  putCommentPayload,
  getReviewQuery,
  oeuvreReviewParams,
  artistReviewParams,
  artistReviewQuery,
  getTimelineQuery,
};
