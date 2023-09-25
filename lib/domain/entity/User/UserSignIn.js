const Joi = require('@hapi/joi')
module.exports = Joi.object().keys({
    email: Joi.string().email().max(40),
    password: Joi.string().max(30),
})