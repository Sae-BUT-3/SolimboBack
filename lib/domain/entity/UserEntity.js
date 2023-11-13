const Joi = require('@hapi/joi')
const validationErrror = require("./utils/validationError")
const userSignIn = Joi.object().keys({
    email: Joi.string().max(40).required(),
    password: Joi.string().max(30).required(),
})

const userSignUp = Joi.object().keys({
    email: Joi.string().email().min(10).max(40).error(validationErrror("email","l'email est invalide")),
    pseudo: Joi.string().min(3).max(15).custom((value, helpers) => {
        if (value.includes('@')) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'pseudo validation').error(validationErrror("pseudo","le pseudo doit être compris entre 3 et 15 caractère")),
    alias: Joi.string().min(3).max(15).error(validationErrror("alias","l'alias doit être compris entre 3 et 15 caractère")),
    password: Joi.string().min(8).max(30).error(validationErrror("password","le mot de passe doit être compris entre 8 et 30 caractères")),
    spotifyToken: Joi.string().max(40),
    bio:Joi.string().max(1500).error(validationErrror("bio","le pseudo doit faire moins de 1500 caractères")),
})

module.exports = {userSignIn, userSignUp}