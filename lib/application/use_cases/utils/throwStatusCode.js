module.exports = (code, message) => {
    const error = new Error(message || 'error')
    error.code = code
    throw error
}