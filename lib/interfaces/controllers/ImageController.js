'use strict';

const uploadImage = require('../../application/use_cases/image/uploadImage');

module.exports = {

    async upload(request,handler){
        const serviceLocator = request.server.app.serviceLocator;
        const {image} = request.payload
        const {path} = await uploadImage(image)
        try{
            return handler
                .response({
                    url : `${request.server.info.uri}/${path}`,
                })
        }
        catch (error){
            console.log(error)
            return handler.response(error).code(500)
        }
    }
};
