const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('Artiste', {

        // attributes
        idArtiste: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        nbSuivis: {
            type: DataTypes.INTEGER,
        }
    });

};
