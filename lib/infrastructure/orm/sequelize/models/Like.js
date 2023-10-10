const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('TypeReview', {

        // attributes
        idOeuvre: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id_user',
            },
        }
    });

};
