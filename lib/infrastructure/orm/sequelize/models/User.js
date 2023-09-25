const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  
  return sequelize.define('user', {

    // attributes
    IdUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [10,40]
      }
    },
    Pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        len: [3,15]
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [8,30]
      }
    },
    IsAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    IsBan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    SpotifyId: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false,
  });

};
