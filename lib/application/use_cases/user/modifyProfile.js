'use strict';
const isImage = require("../utils/isImage")
const throwStatusCode = require("../utils/throwStatusCode")
module.exports = async (file,token,{accessTokenManager, userRepository,documentRepository}) => {
    if(!isImage(file)) throwStatusCode(415,"le fichier fourni n'est pas une image")
    const id = accessTokenManager.decode(token)?.value
    const user = await userRepository.getByUser(id)
    if(! user) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const previewPath = await userRepository.getPreviewPath(id)
    if(previewPath) {
        await documentRepository.deleteFile(previewPath)
    }
    const path = await documentRepository.uploadFile('upload',file)
    if(! path) throwStatusCode(500, "internal server error")
    user.photo = path
    await userRepository.updateUser(user)
    return path
};