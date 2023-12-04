'use strict';
const crypto = require('crypto');
const {writeFile} = require("fs");
module.exports = async (image) => {
    return new Promise((resolve, reject) => {
        const fileLabel = crypto.randomBytes(16).toString('hex')
        const fileExt = image.hapi.filename.split(".")[1]
        const path = `upload/${fileLabel}.${fileExt}`
        writeFile(`./${path}`, image._data, err => {
            if (err) {
                reject(err)
            }
            resolve({ path })
        })
    })
};
