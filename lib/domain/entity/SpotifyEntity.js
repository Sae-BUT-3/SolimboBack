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


const fetchArtist = Joi.object().keys({
    query: Joi.string().min(1).required(), //correspond au ID Artist
})

const fetchArtistSongs = Joi.object().keys({
    id: Joi.string().min(1).required(),
    filter: Joi
        .string()
        .optional()
        .default("album,single")
        .custom((value, helpers) =>{
            const allowedValues = ["album","single","appears_on","compilation"]
            const tabValue = value.replace(/\s/g, '').split(",") // retire les espaces 

            // Renvoie une erreur des qu'un filtre n'est pas valide
            for (const x of tabValue) {
                if (!allowedValues.includes(x)) {
                    return helpers.error('any.invalid');
                }
            }
            return tabValue.join(",")            
        }),
        
    limit: Joi.number().integer().optional().min(1).max(50)
})

module.exports = {album,search,track,fetchArtist,fetchArtistSongs}