const Joi = require('joi')

const likeOeuvre = Joi.object().keys({
    type: Joi
        .string()
        .required()
        .custom((value, helpers) => {
            const allowedValues = ["track", "album", "artist","single","compilation"]
            return allowedValues.includes(value) ? value : helpers.error('any.invalid')
        }),
    id: Joi.string().max(50).required()
})

const getOeuvre = Joi.object().keys({
    id: Joi.string().min(1).required()
})

module.exports = {
    likeOeuvre,
    getOeuvre
}