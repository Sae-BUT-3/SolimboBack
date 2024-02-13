const acceptedHeaders = ['image/png','image/jpeg']
module.exports = (file) => {
    const header = file?.hapi?.headers['content-type']
    return acceptedHeaders.includes(header) && file?.hapi?.filename && file._data
}