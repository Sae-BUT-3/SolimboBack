module.exports = (code, message) => {
    const error = new Error(message || 'error')
    console.log(error)
    error.code = code
    throw error
}