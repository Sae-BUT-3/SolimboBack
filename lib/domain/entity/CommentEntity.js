const Joi = require('joi')
const getCommentParams = Joi.object().keys({
    id: Joi.string().max(50).required()
})
const deleteCommentParams = Joi.object().keys({
    id: Joi.string().max(50).required()
})
const likeCommentParams = Joi.object().keys({
    id: Joi.string().max(50).required()
})
const putCommentParams = Joi.object().keys({
    id: Joi.string().max(50).required()
})
const putCommentPayload = Joi.object().keys({
    description: Joi.string().max(1500).required()
})
module.exports = {
    getCommentParams,
    deleteCommentParams,
    likeCommentParams,
    putCommentPayload,
    putCommentParams
}