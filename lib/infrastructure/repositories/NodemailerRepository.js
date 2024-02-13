'use strict';
const MailRepositoryAbstract = require('./interfaces/MailRepositoryAbstract')
const nodemailer = require('nodemailer')
module.exports = class extends MailRepositoryAbstract{
    constructor(service, user, pass) {
        super();
        this.transporter = nodemailer.createTransport({
            service,
            auth: {
                user,
                pass
            }
        })
    }
    send(config) {
        this.transporter.sendMail(config)
    }





};
