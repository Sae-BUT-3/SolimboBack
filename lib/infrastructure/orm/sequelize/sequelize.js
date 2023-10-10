'use strict';

const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');
const sequelize = new Sequelize(environment.database.url);
const UserModel = require('./models/User')(sequelize)
const LikeModel = require('./models/Like')(sequelize)
const FavoriteModel = require('./models/Favorite')(sequelize)
const RoleModel = require('./models/Role')(sequelize)
const Amis = require('./models/Amis')(sequelize)
const Artiste = require('./models/Artiste')(sequelize)
const Review = require('./models/Review')(sequelize)
const TypeReview = require('./models/TypeReview')(sequelize)
const Commentaire = require('./models/Commentaire')(sequelize)
UserModel.belongsTo(RoleModel)
RoleModel.hasMany(UserModel)

UserModel.belongsToMany(UserModel,
    {
        as: 'Relation',
        through : Amis
    }


)
// UserModel.belongsToMany(UserModel, {through : Amis})
UserModel.belongsToMany(Artiste, {through : 'Follow'})
Artiste.belongsToMany(UserModel, {through : 'Follow'})

UserModel.hasMany(Review)
Review.belongsTo(UserModel)

// TypeReview.hasMany(Review)
// Review.belongsTo(TypeReview)
//





// Review.hasMany(Commentaire)
// Commentaire.belongsTo(Review)
//
Commentaire.hasMany(Commentaire)
Commentaire.belongsTo(Commentaire,{as: 'id_reponse'})
LikeModel.sync()
FavoriteModel.sync()
module.exports = sequelize;