const reviewSerializer = require("../../../interfaces/serializers/ReviewSerializer");
const ReviewPublic = require("../../../domain/model/ReviewPublic");
const PublicComment = require("../../../domain/model/PublicComment");
module.exports = async (id_com,page,pageSize,orderByLike,userToken, {reviewRepository, commentRepository,accessTokenManager,userRepository,friendRepository,spotifyRepository}) => {
    const id_utilisateur = accessTokenManager.decode(userToken)?.value
    if(! await userRepository.getByUser(id_utilisateur)) throwStatusCode(401,"votre token d'authentification n'est pas le bon")
    const mainComment = await commentRepository.getById(id_com)
    if(!mainComment) throwStatusCode(404,"commentaire introuvable")
    console.log("dzzzzzzzzzzzzzzzzzzzz")
    console.log(typeof commentRepository)
    const commentsRaw = await commentRepository.getCommentsComments(id_com,id_utilisateur,false,page,pageSize,orderByLike)
    const review = await reviewRepository.getById(mainComment.id_review)
    let previousComments = []
    let nextCommentsId = mainComment.id_reponse
    while(nextCommentsId) {
        previousComments.push(await commentRepository.getById(nextCommentsId))
        nextCommentsId = previousComments.at(-1).id_reponse
    }
    return await serialize(id_utilisateur,mainComment,previousComments,commentsRaw,review, {spotifyRepository,friendRepository,commentRepository,reviewRepository})
}

const serialize = async (id_utilisateur,comment,previousComments,comments, review, {spotifyRepository,friendRepository,commentRepository,reviewRepository}) => {
    const serializeReview = async () => {
        const rawOeuvre = await spotifyRepository.getOeuvre(review.id_oeuvre,review.type)
        if(rawOeuvre.error)
            throwStatusCode(rawOeuvre.error.status,rawOeuvre.error.message)
        const doesUserLike = await reviewRepository.doesUserLike(id_utilisateur,review.id_review)

        return ! review.utilisateur.is_private || friendRepository.areFriends(id_utilisateur,review.utilisateur.id_utilisateur)
        ? reviewSerializer(review,rawOeuvre,review.utilisateur,doesUserLike,comments)
        : {
            private: true
        }
    }
    const serializeComment = async () => {
        const doesUserLike = await commentRepository.doesUserLike(id_utilisateur,comment.id_com)
        comment.doesUserLike = doesUserLike
        return ! comment.utilisateur.is_private || friendRepository.areFriends(id_utilisateur,comment.utilisateur.id_utilisateur)
        ? new PublicComment(comment)
        : {
            private: true
        }
    
    }
    const serializedPreviousComments = Promise.all(previousComments.map(async (comment) =>{
        const doesUserLike = await commentRepository.doesUserLike(id_utilisateur,comment.id_com)
        comment.doesUserLike = doesUserLike
        return ! comment.utilisateur.is_private || friendRepository.areFriends(id_utilisateur,comment.utilisateur.id_utilisateur)
        ? new PublicComment(comment)
        : {
            private: true
        }
    }))
    const serializedComments = Promise.all(comments.map(async (comment) =>{
        const doesUserLike = await commentRepository.doesUserLike(id_utilisateur,comment.id_com)
        comment.doesUserLike = doesUserLike
        return ! comment.utilisateur.is_private || friendRepository.areFriends(id_utilisateur,comment.utilisateur.id_utilisateur)
        ? new PublicComment(comment)
        : {
            private: true
        }
    }))
    const promise = await Promise.all([serializeReview(),serializeComment(),serializedPreviousComments,serializedComments])
    return {
        review: promise[0],
        comment: promise[1],
        previousComments: promise[2],
        comments: promise[3],
    }
    
    
}