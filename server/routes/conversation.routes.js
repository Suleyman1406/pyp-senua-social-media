const { authJwt } = require("../middlewares");
const controller = require("../controllers/conversation.controller");

module.exports = function (app) {
  app.use(function (_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/conversations/",
    [authJwt.verifyToken],
    controller.getConversation
  );

  app.post(
    "/api/conversations/",
    [authJwt.verifyToken],
    controller.createConversation
  );

  app.get(
    "/api/conversations/:firstUserId/:secondUserId",
    [authJwt.verifyToken],
    controller.getConversationByTwoUserId
  );
};
