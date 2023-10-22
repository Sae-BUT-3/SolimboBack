const Joi = require('@hapi/joi')
const userSignIn = Joi.object().keys({
    email: Joi.string().max(40),
    password: Joi.string().max(30),
})

const userSignUp = module.exports = Joi.object().keys({
    email: Joi.string().email().min(10).max(40),
    pseudo: Joi.string().min(3).max(15).custom((value, helpers) => {
        if (value.includes('@')) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'pseudo validation'),
    alias: Joi.string().min(3).max(15),
    password: Joi.string().min(8).max(30),
    spotifyToken: Joi.string().max(40),
    bio:Joi.string().max(1500),
})

module.exports = {userSignIn, userSignUp}