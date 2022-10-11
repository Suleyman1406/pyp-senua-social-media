const { authJwt } = require("../middlewares");
const controller = require("../controllers/request.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/requests", [authJwt.verifyToken], controller.getRequests);

  app.post(
    "/api/requests/create/:toId",
    [authJwt.verifyToken],
    controller.createRequest
  );

  app.post(
    "/api/requests/cancel/:toId",
    [authJwt.verifyToken],
    controller.cancelRequest
  );

  app.post(
    "/api/requests/confirm/:fromId",
    [authJwt.verifyToken],
    controller.confirmRequest
  );

  app.post(
    "/api/requests/ignore/:fromId",
    [authJwt.verifyToken],
    controller.ignoreRequest
  );
};
