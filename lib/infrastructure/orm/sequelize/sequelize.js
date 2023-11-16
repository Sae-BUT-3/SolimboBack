'use strict';
const { Sequelize } = require('sequelize');
const environment = require('../../config/environment');
const sequelize = new Sequelize(environment.database.url);
const UserModel = require('./models/Utilisateur')(sequelize)
const RoleModel = require('./models/Role')(sequelize)
const AmisModel = require('./models/Amis')(sequelize)
const ArtisteModel = require('./models/Artiste')(sequelize)
const ReviewModel = require('./models/Review')(sequelize)
const TypeReviewModel = require('./models/TypeReview')(sequelize)
const CommentaireModel = require('./models/Commentaire')(sequelize)
require('./models/LikeOeuvre')(sequelize)
require('./models/OeuvreFavorite')(sequelize)



//un utilisateur a un role
UserModel.belongsTo(RoleModel,
    {foreignKey: 'id_role'})

//un utilisateur a un etat


UserModel.belongsToMany(UserModel,
    {
        as: 'amis_2',
        foreignKey: 'amis_2_id',
        through : AmisModel
    }
)

UserModel.belongsToMany(CommentaireModel,
    {
        as: 'user_like_comment',
        foreignKey: 'id_user',
        through : 'like_commentaire'
    }
)

CommentaireModel.belongsToMany(UserModel,
    {
        as: 'comment_like',
        foreignKey: 'id_com',
        through : 'like_commentaire'
    }
)

UserModel.belongsToMany(ArtisteModel,
    {
        as: 'utilisateur',
        foreignKey: 'id_utilisateur',
        through : 'follow'
    }
)
ArtisteModel.belongsToMany(UserModel,
    {
        as: 'artiste',
        foreignKey: 'id_artiste',
        through : 'follow'
    }
)
UserModel.belongsToMany(ReviewModel,{
    as: 'user_like_review',
    foreignKey: 'id_artiste',
    through : 'like_review'
})
ReviewModel.belongsToMany(UserModel,{
    as: 'review_like',
    foreignKey: 'id_review',
    through : 'like_review'
})

ReviewModel.belongsTo(UserModel, {
    as:'utilisateur',
    foreignKey:'id_utilisateur'
})


ReviewModel.belongsTo(TypeReviewModel, {
    as:'type_review',
    foreignKey:'id_type_review'
})


ReviewModel.hasMany(CommentaireModel, {
    as:'comment_review',
    foreignKey:'id_review'
})
CommentaireModel.belongsTo(ReviewModel,{
    as:'review_comment',
    foreignKey:'id_review'
})

CommentaireModel.hasMany(CommentaireModel,{ as: 'reponse', foreignKey: 'id_reponse' })


RoleModel.sync()
    .then(()=>{
    return RoleModel.bulkCreate([
        {id_role: 1, libelle : 'administrateur'},
        {id_role: 2, libelle : 'utlisateur'},
    ])
    })
    .then(() => console.log('Creation des roles réussi'))
    .catch((error) => {
        console.error('Erreur dans la création des roles : '+error)
    })

module.exports = sequelize;