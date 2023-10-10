const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('User', {

    // attributes
    id_user: {
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    tokenSpotify: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    IdSpotify: {
      type: DataTypes.STRING(50),
    },
    photo: {
      type: DataTypes.STRING(250),
    },
    bio: {
      type: DataTypes.STRING(1500),
    },
    role: {
      type: DataTypes.INTEGER,
    }});

};
