const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {

    return sequelize.define('notification', {
        id_notification: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sender: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'utilisateur', // nom de la table référencée
            key: 'id_utilisateur',
          },
        },
        receiver: { // Correction de la faute de frappe `receiver` en `receiver`
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'utilisateur', // nom de la table référencée
            key: 'id_utilisateur',
          },
        },
        id_com: {
          type: DataTypes.INTEGER,
          references: {
            model: 'commentaire', // nom de la table référencée
            key: 'id_com',
          },
        },
        id_review: {
          type: DataTypes.INTEGER,
          references: {
            model: 'review', // nom de la table référencée
            key: 'id_review',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      }, {
        tableName: 'notification', // Nom explicite de la table
        timestamps: true, // Sequelize gère automatiquement `createdAt` et `updatedAt`
      })}
