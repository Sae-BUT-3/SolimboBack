// Verifie le bon format de la query / payload
const Joi = require('@hapi/joi')
const trackBody = Joi.object().keys({
    query: Joi
        .string()
        .min(1)
        .max(50)
        .required(),
    spotify_filter: Joi
        .string()
        .max(50)
        .required()
        .custom((value, helpers) =>{
            const allowedValues = ["track","artist","album"]
            const tabValue = value.split(",")
            let correct = true
            tabValue.forEach((value) => {
                if(!allowedValues.includes(value)){
                    correct = false
                }
        })
        return correct ? value : helpers.error('any.invalid')
    }),
    allow_user: Joi.boolean().required(),
    limit: Joi.number().integer().required()
})

const album = Joi.object().keys({
    id: Joi
        .string()
        .min(1)
        .required(),
})

const fetchArtist = Joi.object().keys({
    query: Joi.string().min(1).required(), //correspond au ID Artist
})
module.exports = {trackBody,album,fetchArtist}