const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('type_review', {

        // attributes
        id_type_teview: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        libelle: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {  freezeTableName: true,}
    );

};
