const Joi = require('@hapi/joi')
const search = Joi.object().keys({
    query: Joi
        .string()
        .min(1)
        .max(50)
        .required(),
    spotify_filter: Joi
        .string()
        .required()
        .max(50)
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

const track = Joi.object().keys({
    id: Joi
        .string()
        .min(1)
        .required(),
})


module.exports = {search, album, track}