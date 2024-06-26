"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("notification", {
      id_notification: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      sender: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "utilisateur",
          },
          key: "id_utilisateur",
        },
        allowNull: false,
      },
      receiver: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "utilisateur",
          },
          key: "id_utilisateur",
        },
        allowNull: false,
      },
      id_com: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "commentaire",
          },
          key: "id_com",
        },
      },
      id_review: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "review",
          },
          key: "id_review",
        },
      },
      reply: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "commentaire",
          },
          key: "id_com",
        },
      },
      is_old: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("notification");
  },
};
