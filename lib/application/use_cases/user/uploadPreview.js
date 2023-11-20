'use strict';
const crypto = require('crypto');
const {writeFile,unlink} = require("fs");
const isImage = require("../utils/isImage")
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (file,token,{accessTokenManager, userRepository}) => {
    if(!isImage(file)) throwStatusCode('415',"le fichier fourni n'est pas une image")
    const id = accessTokenManager.decode(token)?.value
    if(! await userRepository.getByUser(id)) throwStatusCode('401',"votre token d'authentification n'est pas le bon")
    const previewPath = await userRepository.getPreviewPath(id)
    if(previewPath) {
        await unlink(previewPath,err => {
            if(err){
                throwStatusCode(500, err.message)
            }
        })
    }
    const fileLabel = crypto.randomBytes(16).toString('hex')
    const fileExt = file.hapi.filename.split(".")[1]
    const path = `upload/${fileLabel}.${fileExt}`
    return new Promise((resolve, reject) => {
        const fileLabel = crypto.randomBytes(16).toString('hex')
        const fileExt = file.hapi.filename.split(".")[1]
        const path = `upload/${fileLabel}.${fileExt}`
        writeFile(`./${path}`, file._data, err => {
            if (err) {
                reject()
            }
            userRepository.addPreviewPath(id,path)
            resolve(path)
        })
    })
};