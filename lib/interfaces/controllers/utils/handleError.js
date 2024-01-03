const Boom = require("@hapi/boom")

module.exports = (error) => {
    const statusCode = error?.code ? error.code : 500
    console.log(error)
    return Boom.boomify(error, {statusCode: statusCode})
}