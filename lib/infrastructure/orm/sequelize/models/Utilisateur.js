const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('utilisateur', {


    // attributes
    id_utilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pseudo: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    alias: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200 ),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    token_spotify: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    id_spotify: {
      type: DataTypes.STRING(50),
    },
    photo: {
      type: DataTypes.STRING(250),
    },
    bio: {
      type: DataTypes.STRING(1500),
    },
  },
      {  freezeTableName: true,}
  );

};
