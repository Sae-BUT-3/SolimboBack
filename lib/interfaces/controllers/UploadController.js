const Path = require("path");
module.exports = {
  async getImage(request, handler) {
    const { filename } = request.params;

    return handler.file(filename);
  },
};
