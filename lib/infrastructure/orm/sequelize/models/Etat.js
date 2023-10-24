const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('etat', {

            // attributes
            id_etat: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            libelle: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {  freezeTableName: true,});

};
