const Path = require("path");
module.exports = {
  async getImage(request, handler) {
    console.log("dfzaedzadza");
    const { filename } = request.params;

    return handler.file(filename);
  },
};
