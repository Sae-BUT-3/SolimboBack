'use strict';

const sequelize = require('../orm/sequelize/sequelize');
const review = require('../../domain/model/Review');
const ReviewRepository = require('./interfaces/ReviewRepositoryAbstract');
const { Op} = require('sequelize');
module.exports = class extends ReviewRepository {

    constructor() {
        super();
        this.db = sequelize;
        this.model = this.db.model('review');
        this.user = this.db.model('user');
    }

    async persist(ReviewEntity) {
        console.log("test")
        const seqReview = await this.model.create(ReviewEntity, {
            include: [{
                model: this.user,
            }]
        });
        console.log(seqReview)
        await seqReview.save();
        return this.createReview(seqUser)
    }
    async getByUserAndId(id_oeuvre,id_utilisateur) {
        return null
    }
    createReview(seqReview){
        // if(!seqReview) return null
        // return new review(seqReview);
    }

};

