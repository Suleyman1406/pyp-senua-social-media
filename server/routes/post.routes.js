const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/posts/all", [authJwt.verifyToken], controller.getPosts);

  app.post("/api/posts/create", [authJwt.verifyToken], controller.createPost);

  app.post(
    "/api/posts/toggle-like/:id",
    [authJwt.verifyToken],
    controller.toggleLike
  );
};
