const getNotifications = require("../../application/use_cases/notification/getNotifications");
const handleError = require("./utils/handleError");
module.exports = {
  async getNotifications(request, handler) {
    try {
      // Context
      const serviceLocator = request.server.app.serviceLocator; // a tous les repo
      const { page, pageSize } = request.query;
      const authorizationHeader = request.headers.authorization;
      const token = authorizationHeader?.split(" ")[1];
      return handler
        .response(await getNotifications(token, page, pageSize, serviceLocator))
        .code(200);
    } catch (error) {
      return handleError(error);
    }
  },
};
