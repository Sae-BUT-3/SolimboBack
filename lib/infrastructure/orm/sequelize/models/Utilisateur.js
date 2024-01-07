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
      unique: true,
    },
    alias: {
      type: DataTypes.STRING(15),
    },
    password: {
      type: DataTypes.STRING(200 ),
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(400),
      unique: true,
    },
    refresh_token: {
      type: DataTypes.STRING(400),
        unique: true,
    },
    id_spotify: {
      type: DataTypes.STRING(50),
    },
    photo: {
      type: DataTypes.STRING(250),
    },
    photo_temporaire: {
      type: DataTypes.STRING(250),
    },
    ban_until: {
      type: DataTypes.DATE
    },
    bio: {
      type: DataTypes.STRING(1500),
    },
    confirmed: {
      type: DataTypes.BOOLEAN
    },
    confirm_token: {
      type: DataTypes.STRING(50),
    },
        reset_token: {
      type: DataTypes.STRING(50),
    },
  },
      {  freezeTableName: true,}
  );

};
