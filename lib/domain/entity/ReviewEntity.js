const Joi = require('@hapi/joi')
const putReview = Joi.object().keys({
    idOeuvre: Joi
        .string()
        .min(1)
        .max(50)
        .required(),
    description: Joi
        .string()
        .min(1)
        .max(1500)
        .required(),
    note: Joi
        .number()
        .integer()
        .greater(-1)
        .less(6)
        .required(),
    type: Joi
        .string()
        .required()
        .custom((value, helpers) => {
            const allowedValues = ["track", "album", "artist","single","compilation"]
            return allowedValues.includes(value) ? value : helpers.error('any.invalid')
        })
})
const deleteReview = Joi.object().keys({
    idReview: Joi
        .string()
        .min(1)
        .max(50)
        .required()
})

const getReviewParams = Joi.object().keys({
    id: Joi
        .string()
        .min(1)
        .max(50)
        .required()
})

const getReviews = Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
    orderByLike: Joi.boolean().invalid(false)
})

const likeReviewParams = Joi.object().keys({
    id: Joi.number().required()
})

const likeReviewQuery = Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
})

const userReviewParams = Joi.object().keys({
    id: Joi.string().max(50).required()
})

const userReviewQuery = Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
    orderByLike: Joi.boolean().invalid(false)
})
module.exports = {
    putReview,
    deleteReview,
    getReviewParams,
    getReviews,
    likeReviewParams,
    likeReviewQuery,
    userReviewParams,
    userReviewQuery
}