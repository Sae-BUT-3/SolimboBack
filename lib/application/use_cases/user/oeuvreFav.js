const throwStatusCode = require("../utils/throwStatusCode");
const getAlbum = require("../spotify/getAlbum");
const getTrack = require("../spotify/getTrack");
const { error } = require("@hapi/joi/lib/base");

module.exports = async (userToken, idOeuvre, type, {userRepository, oeuvreFavRepository, accessTokenManager,spotifyRepository}) =>{
    const idUtilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(idUtilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")

    const oeuvre = spotifyRepository.getOeuvre(idOeuvre, type)
    if(oeuvre.error)
        throwStatusCode(oeuvre.error.status,oeuvre.error.message)

   if (!(await oeuvreFavRepository.oeuvreFavExists(idUtilisateur, idOeuvre))){

        if (!(await oeuvreFavRepository.ajoutPossible(idUtilisateur))) throwStatusCode(403,"Vous avez atteints le nombre maximal d'oeuvres favorites") 
        await oeuvreFavRepository.addOeuvrefav(idUtilisateur,idOeuvre,type)
        return true 
    }

    await oeuvreFavRepository.deleteOeuvrefav(idUtilisateur,idOeuvre)
    return false
}