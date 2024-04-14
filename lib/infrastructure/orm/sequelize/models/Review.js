const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('review', {

        // attributes
        id_review: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_oeuvre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1500),
        },
        note: {
            type: DataTypes.INTEGER,
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {  freezeTableName: true,});

};
