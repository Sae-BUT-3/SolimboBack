'use strict';
const isImage = require("../utils/isImage")
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (file,token,{accessTokenManager, userRepository,documentRepository}) => {
    if(!isImage(file)) throwStatusCode('415',"le fichier fourni n'est pas une image")
    const id = accessTokenManager.decode(token)?.value
    if(! await userRepository.getByUser(id)) throwStatusCode('401',"votre token d'authentification n'est pas le bon")
    const previewPath = await userRepository.getPreviewPath(id)
    if(previewPath) {
        documentRepository.deleteFile(previewPath)
    }
    const path = await documentRepository.uploadFile('upload',file)
    if(! path) throwStatusCode(500, "internal server error")
    userRepository.addPreviewPath(id,path)
    return path
};