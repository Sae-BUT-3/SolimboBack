const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('role', {

        // attributes
        id_role: {
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
