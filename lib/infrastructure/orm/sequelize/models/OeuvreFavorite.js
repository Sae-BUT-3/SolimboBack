const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('oeuvre_favorite', {

        // attributes
        id_oeuvre: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        id_utilisateur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'utilisateur',
                key: 'id_utilisateur',
            },
        }   
    },
        {  freezeTableName: true,});

};
