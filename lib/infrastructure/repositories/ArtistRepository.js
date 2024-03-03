'use strict';
const artistRepositoryAbstract = require('./interfaces/artistRepositoryAbstract')

module.exports = class extends artistRepositoryAbstract{

    constructor() {
        super();
        this.db = sequelize;
        this.model = this.db.model('follow');
      }

    getFansCount(idArtist,idUser) {
        const count = this.model.count({
            where: {
                id_artist: idArtist
            }
        })
        console.log("count",count)
        return count
    }



};
