const { authJwt } = require("../middlewares");
const controller = require("../controllers/message.controller");

module.exports = function (app) {
  app.use(function (_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/messages/", [authJwt.verifyToken], controller.createMessage);

  app.get(
    "/api/messages/:conversationId",
    [authJwt.verifyToken],
    controller.getMessages
  );
};
