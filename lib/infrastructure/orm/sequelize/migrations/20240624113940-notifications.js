'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('notification', {
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
            tableName: 'utilisateur',
          },
          key: 'id_utilisateur',
        },
        allowNull: false,
      },
      reviever: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'utilisateur',
          },
          key: 'id_utilisateur',
        },
        allowNull: false,
      },
      is_old: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      id_com: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'commentaire',
          },
          key: 'id_com',
        },
      },
      is_review: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'review',
          },
          key: 'id_review',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("notification")
  }
};
