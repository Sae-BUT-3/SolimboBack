const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('Reviews', {

        // attributes
        idReview: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idOeuvre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1500),
        },
        note: {
            type: DataTypes.INTEGER,
        },
    });

};
