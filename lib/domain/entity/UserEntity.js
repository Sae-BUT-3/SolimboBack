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
    photo: Joi.string().max(500),
    confirmToken: Joi.string().max(50),
    bio:Joi.string().min(0).max(1500).error(validationErrror("bio","la bio doit faire moins de 1500 caractères")),
})
const uploadPreview = Joi.object().keys({
    file: Joi.any()
})
const createUser = Joi.object().keys({
    email: Joi.string().email().min(10).max(40).required(),
    password: Joi.string().max(30).required(),
})
const authWithSpotify = Joi.object().keys({
    spotify_code: Joi.string().max(1000).required(),
    mobile: Joi.boolean()
})
const isUser = Joi.object().keys({
    pseudo: Joi.string().min(3).max(15).required(),
})
const getUserByConfirmToken = Joi.object().keys({
    confirmToken: Joi.string().max(50).required(),
})
const sendResetEmail = Joi.object().keys({
        email: Joi.string().email().min(10).max(40)
})
const resetPassword = Joi.object().keys({
    resetToken: Joi.string().max(50).required(),
    password: Joi.string().min(8).max(30).required().error(validationErrror("password","le mot de passe doit être compris entre 8 et 30 caractères"))
})
const follow = Joi.object().keys({
    artistId: Joi
        .string()
        .min(1)
        .required(),
})

module.exports = {
    userSignIn,
    userSignUp,
    uploadPreview,
    createUser,
    isUser,
    getUserByConfirmToken,
    sendResetEmail,
    resetPassword,
    follow,
    authWithSpotify
}