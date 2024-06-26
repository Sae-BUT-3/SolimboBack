const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "oeuvre",
    {
      // attributes
      id_oeuvre: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },
    },
    { freezeTableName: true }
  );
};
