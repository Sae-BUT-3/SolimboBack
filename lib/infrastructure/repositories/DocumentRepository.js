'use strict';
const documentRepositoryAbstract = require('./interfaces/DoucumentRepositoryAbstract')
const {unlink, writeFile} = require("fs");
const crypto = require("crypto");

module.exports = class extends documentRepositoryAbstract{

    uploadFile(folderPath,file) {
        return new Promise((resolve, reject) => {
            const fileLabel = crypto.randomBytes(16).toString('hex')
            const fileExt = file.hapi.filename.split(".")[1]
            const path = `${folderPath}/${fileLabel}.${fileExt}`
            writeFile(`${path}`, file._data, err => {
                if (err) {
                    reject(err)
                }
                resolve(path)
            })
        })
    }
    deleteFile(path){
        unlink(`./${path}`,err => {
            if(err){
                //throw err
            }
        })
    }





};
