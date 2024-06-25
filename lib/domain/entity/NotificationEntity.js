const Joi = require('joi')

const notificationsEntity = Joi.object({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
})

module.exports = {notificationsEntity}