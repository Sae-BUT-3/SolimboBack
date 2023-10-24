const Joi = require('@hapi/joi')
const trackBody = Joi.object().keys({
    query: Joi.string().max(50),
    filter: Joi.string().max(50),
    limit: Joi.number().integer(),
})


module.exports = {trackBody}