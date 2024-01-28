'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const review = require('../../domain/model/Review');
const ReviewRepository = require('./interfaces/ReviewRepositoryAbstract');
const { Op} = require('sequelize');
const {id_utilisateur} = require("../../domain/model/User");
module.exports = class extends ReviewRepository {

    constructor() {
        super();
        this.db = sequelize;
        this.review = this.db.model('review');
        this.TypeReview = this.db.model('type_review');
        this.user = this.db.model('utilisateur');
    }
    createReview(seqReview) {
        if(!seqReview) return null
        const {
            id_review,
            id_oeuvre,
            description,
            note,
            createdAt,
            utilisateur,
            type_review,
        } = seqReview
        return {
            id_review,
            id_oeuvre,
            description,
            note,
            createdAt,
            utilisateur: utilisateur,
            type: type_review.libelle
        }
    }
    async persist(ReviewEntity) {
        let seqReview = await this.review.create(ReviewEntity, {
            include: [{
                model: this.user,
                as: "utilisateur",
                attributes: ['alias']
            }]
        });
        return this.getById(seqReview.id_review)
    }
    async getByUserAndId(id_oeuvre,id_utilisateur) {
        return await this.review.findOne({
            where: {
                id_oeuvre,
                id_utilisateur
            }
        })
    }
    async getTypeReviewID(label){
        const seqTypeReview = await this.TypeReview.findOne({
            where: {
                libelle: label
            }
        });
        return seqTypeReview?.id_type_review

    }

    async delete(id_review,id_utilisateur) {
        const seqReview = await this.review.findOne({
            where: {
                id_review,
                id_utilisateur
            }
        });
        if(!seqReview) return false
        await this.review.destroy({
            where: {
                id_review,
                id_utilisateur
            }
        });
        return true
    }
    async getById(id_review){
        const seqReview = await this.review.findOne({
            where: {
                id_review: id_review
            },
            include: [
                {
                    model: this.user,
                    as: "utilisateur",
                },
                {
                    model: this.TypeReview,
                    attributes: ["libelle"],
                    as:  "type_review"
                }
            ]
        });
        return this.createReview(seqReview)
    }

    async getReviews(page,pageSize,orderByLike) {

        const offset = (page - 1) * pageSize;
        const reviews = await this.review.findAll({
            include: []

        })
    }
};

