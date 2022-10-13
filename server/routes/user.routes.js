const { authJwt, upload } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user",
    [authJwt.verifyToken],
    upload.single("uploaded_file"),
    controller.updateUser
  );

  app.get(
    "/api/user/:username",
    [authJwt.verifyToken],
    controller.getByUsername
  );

  app.get(
    "/api/user/friends/all",
    [authJwt.verifyToken],
    controller.getFriends
  );

  app.delete(
    "/api/user/friends/:friendId",
    [authJwt.verifyToken],
    controller.deleteFromFriends
  );
};
