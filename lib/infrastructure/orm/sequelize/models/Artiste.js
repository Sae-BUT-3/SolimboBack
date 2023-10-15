const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('artiste', {

        // attributes
        id_artiste: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        nb_suivis: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    },
        {  freezeTableName: true,});

};
