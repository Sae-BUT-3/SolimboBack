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
            const allowedValues = ["track", "album", "artist"]
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

const getReview = Joi.object().keys({
    idReview: Joi
        .string()
        .min(1)
        .max(50)
        .required()
})
const getReviews = Joi.object().keys({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1),
    orderByLike: Joi.boolean()
})
module.exports = {
    putReview,
    deleteReview,
    getReview,
    getReviews
}