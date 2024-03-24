const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('commentaire', {

        // attributes
        id_com: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {  freezeTableName: true,});

};
