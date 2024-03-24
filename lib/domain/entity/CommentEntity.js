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
const getCommentQuery = Joi.object().keys({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
    orderByLike: Joi.boolean()
})
module.exports = {
    getCommentParams,
    deleteCommentParams,
    likeCommentParams,
    putCommentPayload,
    putCommentParams,
    getCommentQuery
}