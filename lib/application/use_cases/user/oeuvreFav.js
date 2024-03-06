const throwStatusCode = require("../utils/throwStatusCode");
const getAlbum = require("../spotify/getAlbum");
const getTrack = require("../spotify/getTrack");
<<<<<<< HEAD
const { error } = require("@hapi/joi/lib/base");
=======

// indiquer bon repo 
>>>>>>> 7a656c3 (ajout, supression et get oeuvres Fav, reste tests)

module.exports = async (userToken, idOeuvre, {userRepository, oeuvreFavRepository, accessTokenManager,spotifyRepository}) =>{
    const idUtilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(idUtilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
   
    //chercher album 
    // sinon cherche track 
    let oeuvre

    try {
        oeuvre = await getAlbum(idOeuvre, {spotifyRepository});
    } catch (errorAlbum) {
<<<<<<< HEAD
=======
        
>>>>>>> 7a656c3 (ajout, supression et get oeuvres Fav, reste tests)
        try {
            oeuvre = await getTrack(idOeuvre, {spotifyRepository});
        } catch (errorTrack) {
            throwStatusCode(404, "L'ID de l'oeuvre est introuvable");
        }
    }

<<<<<<< HEAD
   if (!(await oeuvreFavRepository.oeuvreFavExists(idUtilisateur, idOeuvre))){
=======
    if (!(await oeuvreFavRepository.oeuvreFavExists(idUtilisateur, idOeuvre))){
>>>>>>> 7a656c3 (ajout, supression et get oeuvres Fav, reste tests)

        if (!(await oeuvreFavRepository.ajoutPossible(idUtilisateur))) throwStatusCode(403,"Vous avez atteints le nombre maximal d'oeuvres favorites") 

        await oeuvreFavRepository.addOeuvrefav(idUtilisateur,idOeuvre)
        return true 
    }

    await oeuvreFavRepository.deleteOeuvrefav(idUtilisateur,idOeuvre)
<<<<<<< HEAD
=======
   console.log(oeuvre)
>>>>>>> 7a656c3 (ajout, supression et get oeuvres Fav, reste tests)
    return false
}