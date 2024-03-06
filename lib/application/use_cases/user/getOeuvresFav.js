const throwStatusCode = require("../utils/throwStatusCode");

<<<<<<< HEAD
=======
// indiquer bon repo 

>>>>>>> 7a656c3 (ajout, supression et get oeuvres Fav, reste tests)
module.exports = async (userToken, {userRepository, oeuvreFavRepository, accessTokenManager}) =>{
    const idUtilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(idUtilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
   
    let oeuvresFav = []
    oeuvresFav =  await oeuvreFavRepository.getOeuvresFav(idUtilisateur)
    return oeuvresFav
}