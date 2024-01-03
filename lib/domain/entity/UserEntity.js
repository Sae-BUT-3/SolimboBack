const Joi = require('@hapi/joi')
const validationErrror = require("./utils/validationError")
const userSignIn = Joi.object().keys({
    email: Joi.string().max(40).required(),
    password: Joi.string().max(30).required(),
})

const userSignUp = Joi.object().keys({
    pseudo: Joi.string().min(3).max(15).required().custom((value, helpers) => {
        if (value.includes('@')) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'pseudo validation').error(validationErrror("pseudo","le pseudo doit être compris entre 3 et 15 caractère")),
    alias: Joi.string().min(3).max(15).error(validationErrror("alias","l'alias doit être compris entre 3 et 15 caractère")),
    password: Joi.string().min(8).max(30).required().error(validationErrror("password","le mot de passe doit être compris entre 8 et 30 caractères")),
    photo: Joi.string().max(500),
    confirmToken: Joi.string().max(50),
    bio:Joi.string().max(1500).error(validationErrror("bio","le pseudo doit faire moins de 1500 caractères")),
})

module.exports = {userSignIn, userSignUp}