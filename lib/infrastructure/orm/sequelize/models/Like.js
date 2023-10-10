const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('Likes', {

        // attributes
        idOeuvre: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Users',
                key: 'id_user',
            },
        }
    });

};
