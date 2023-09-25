const Joi = require('@hapi/joi')
module.exports = Joi.object().keys({
    email: Joi.string().email().min(10).max(40),
    pseudo: Joi.string().min(3).max(15),
    password: Joi.string().min(8).max(30),
    spotifyId: Joi.string().min(10).max(40),
})