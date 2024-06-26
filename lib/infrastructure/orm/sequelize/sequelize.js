"use strict";
const { Sequelize } = require("sequelize");
const environment = require("../../config/environment");
const Utilisateur = require("./models/Utilisateur");
const sequelize = new Sequelize(environment.database.url);
const UserModel = require("./models/Utilisateur")(sequelize);
const RoleModel = require("./models/Role")(sequelize);
const AmisModel = require("./models/Amis")(sequelize);
const ArtisteModel = require("./models/Artiste")(sequelize);
const ReviewModel = require("./models/Review")(sequelize);
const TypeReviewModel = require("./models/TypeReview")(sequelize);
const CommentaireModel = require("./models/Commentaire")(sequelize);
const NotificationModel = require("./models/Notification")(sequelize);
const OeuvreModel = require("./models/Oeuvre")(sequelize);
require("./models/LikeOeuvre")(sequelize);
require("./models/OeuvreFavorite")(sequelize);

//un utilisateur a un role
UserModel.belongsTo(RoleModel, { foreignKey: "id_role" });

//un utilisateur a un etat

UserModel.belongsToMany(UserModel, {
  as: "ami",
  foreignKey: {
    name: "id_utilisateur",
    primaryKey: true,
  },
  through: {
    model: AmisModel,
    primaryKey: true,
  },
});

UserModel.belongsToMany(CommentaireModel, {
  as: "user_like_comment",
  foreignKey: "id_utilisateur",
  through: "like_commentaire",
});

CommentaireModel.belongsToMany(UserModel, {
  as: "comment_like",
  foreignKey: "id_com",
  through: "like_commentaire",
});

UserModel.belongsToMany(ArtisteModel, {
  as: "utilisateur_m_n",
  foreignKey: "id_utilisateur",
  through: "follow",
});
ArtisteModel.belongsToMany(UserModel, {
  as: "artiste",
  foreignKey: "id_artiste",
  through: "follow",
});
UserModel.belongsToMany(ReviewModel, {
  as: "user_like_review",
  foreignKey: "id_utilisateur",
  through: "like_review",
});
ReviewModel.belongsToMany(UserModel, {
  as: "review_like",
  foreignKey: "id_review",
  through: "like_review",
});

ReviewModel.belongsTo(UserModel, {
  as: "utilisateur",
  foreignKey: "id_utilisateur",
});
ReviewModel.belongsTo(TypeReviewModel, {
  as: "type_review",
  foreignKey: "id_type_review",
});

ReviewModel.hasMany(CommentaireModel, {
  as: "comment_review",
  foreignKey: "id_review",
  onDelete: "cascade",
});
CommentaireModel.belongsTo(ReviewModel, {
  as: "review_comment",
  foreignKey: "id_review",
});

CommentaireModel.belongsTo(UserModel, {
  as: "user_review",
  foreignKey: "id_utilisateur",
});
CommentaireModel.hasMany(CommentaireModel, {
  as: "reponse",
  foreignKey: "id_reponse",
  onDelete: "cascade",
});
NotificationModel.belongsTo(UserModel, {
  foreignKey: "sender",
  as: "Sender",
});

NotificationModel.belongsTo(UserModel, {
  foreignKey: "receiver",
  as: "Receiver",
});
NotificationModel.belongsTo(CommentaireModel, {
  foreignKey: "reply",
  as: "Reply",
});
NotificationModel.belongsTo(CommentaireModel, {
  foreignKey: "id_com",
  as: "Commentaire",
});

NotificationModel.belongsTo(ReviewModel, {
  foreignKey: "id_review",
  as: "Review",
});
OeuvreModel.belongsToMany(ArtisteModel, {
  as: "oeuvre",
  foreignKey: "id_oeuvre",
  through: "relation_oeuvre",
});

ArtisteModel.belongsToMany(OeuvreModel, {
  as: "artist",
  foreignKey: "id_artiste",
  through: "relation_oeuvre",
});

ReviewModel.belongsTo(OeuvreModel, {
  as: "oeuvre",
  foreignKey: "id_oeuvre",
});
RoleModel.sync()
  .then(() => {
    return RoleModel.bulkCreate([
      { id_role: 1, libelle: "administrateur" },
      { id_role: 2, libelle: "utlisateur" },
    ]);
  })
  .then(() => console.log("Creation des roles réussi"))
  .catch((error) => {
    console.error("Erreur dans la création des roles : " + error);
  });

TypeReviewModel.sync()
  .then(() => {
    return TypeReviewModel.bulkCreate([
      { id_type_review: 1, libelle: "track" },
      { id_type_review: 2, libelle: "album" },
      { id_type_review: 3, libelle: "artist" },
      { id_type_review: 4, libelle: "single" },
      { id_type_review: 5, libelle: "compilation" },
    ]);
  })
  .then(() => console.log("Creation des types de reviews réussi"))
  .catch((error) => {
    console.error("Erreur dans la création des types de reviews : " + error);
  });
module.exports = sequelize;
