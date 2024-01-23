const Joi = require('@hapi/joi')
const postReview = Joi.object().keys({
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
        .required()
})

module.exports = {
    postReview
}