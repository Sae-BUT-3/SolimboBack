// Verifie le bon format de la query / payload
const Joi = require('@hapi/joi')
const search = Joi.object().keys({
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
            const allowedValues = ["track","artist","album","user"]
            const tabValue = value.split(",")
            let correct = true
            tabValue.forEach((value) => {
                if(!allowedValues.includes(value)){
                    correct = false
                }
        })
        return correct ? value : helpers.error('any.invalid')
    }),
    limit: Joi.number().integer().required()
})

const album = Joi.object().keys({
    id: Joi
        .string()
        .min(1)
        .required(),
})

const track = Joi.object().keys({
    id: Joi
        .string()
        .min(1)
        .required(),
})

const getAuthURL = Joi.object().keys({
    mobile: Joi.boolean().invalid("false")
})

const fetchArtist = Joi.object().keys({
    query: Joi.string().min(1).required(), //correspond au ID Artist
})
module.exports = {album,fetchArtist,search,track}