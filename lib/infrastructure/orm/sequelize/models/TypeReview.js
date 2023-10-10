const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('TypeReview', {

        // attributes
        idTypeReview: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        libelle: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    });

};
