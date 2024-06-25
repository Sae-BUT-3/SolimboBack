'use strict';
const NotificationController = require('../controllers/NotificationController');
const {notificationsEntity} = require("../../domain/entity/NotificationEntity");
module.exports = {
    name: 'notification',
    version: '1.0.0',
    register: async (server) => {

        server.route([
            {
                method: 'GET',
                path: '/notifications',
                handler: NotificationController.getNotifications,
                options: {
                    auth: 'jwt',
                    description: 'Create a static image',
                    tags: ['api'],
                    plugins: {
                        'hapi-swagger': {
                            responses: {
                                200: {description : 'Success'},
                                204: {description : 'No content'},
                            }
                        }
                    },
                    validate: {
                        query: notificationsEntity
                    }
                },
            },
        ]);
    }
};