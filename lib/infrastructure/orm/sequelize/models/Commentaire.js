const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('Commentaires', {

        // attributes
        idCom: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(1500),
            allowNull: false,
        },
    });

};
