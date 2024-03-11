const Joi = require('joi')

const getArtist = Joi.object().keys({
    id: Joi.string().max(50).required()
})

module.exports = {
    getArtist
}