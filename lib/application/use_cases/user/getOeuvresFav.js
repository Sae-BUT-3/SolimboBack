const throwStatusCode = require("../utils/throwStatusCode");

// indiquer bon repo 

module.exports = async (userToken, {userRepository, oeuvreFavRepository, accessTokenManager}) =>{
    const idUtilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(idUtilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
   
    let oeuvresFav = []

    oeuvresFav =  await oeuvreFavRepository.getOeuvresFav(idUtilisateur)
   console.log("TABLEAU : ", oeuvresFav)
    return oeuvresFav
}