const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('Amis', {

        // attributes
        pending: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

};
