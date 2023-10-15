const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('amis', {

        // attributes
        en_attente: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
        {  freezeTableName: true,});

};
