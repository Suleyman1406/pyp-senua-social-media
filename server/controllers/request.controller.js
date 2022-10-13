const db = require("../models");
const Request = db.request;
const User = db.user;

exports.getRequests = (req, res) => {
  const { userId: currentUserId } = req;
  Request.find({ to: currentUserId, status: "Pending" }, (err, requests) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    let users = requests.map((request) => request.from);
    User.find({ _id: { $in: users } }, (err, userList) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(
        userList.map((user) => ({
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          profilePhotoURL: user.profilePhotoURL?.replace("public", "") ?? null,
        }))
      );
    });
  });
};

exports.createRequest = (req, res) => {
  const { userId: currentUserId } = req;
  const { toId } = req.params;

  if (currentUserId === toId) {
    res.status(500).send({ message: "Cannot add yourself as a friend" });
    return;
  }
  Request.findOne(
    { to: toId, from: currentUserId, status: "Pending" },
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (result) {
        res.status(200).send({ message: "Request was sent successfully" });
        return;
      }

      const request = new Request({
        from: currentUserId,
        to: toId,
      });
      request.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({ message: "Request was sent successfully" });
      });
    }
  );
};

exports.cancelRequest = (req, res) => {
  const { userId: currentUserId } = req;
  const { toId } = req.params;

  Request.findOneAndUpdate(
    { to: toId, from: currentUserId, status: "Pending" },
    { status: "Canceled" },
    undefined,
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Request was canceled successfully" });
    }
  );
};

exports.confirmRequest = (req, res) => {
  const { userId: currentUserId } = req;
  const { fromId } = req.params;

  User.updateOne(
    { _id: currentUserId },
    {
      $addToSet: {
        friends: {
          _id: fromId,
        },
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      User.updateOne(
        { _id: fromId },
        {
          $addToSet: {
            friends: {
              _id: currentUserId,
            },
          },
        },
        (err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          Request.updateOne(
            { to: currentUserId, from: fromId, status: "Pending" },
            { status: "Confirmed" },
            (err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res
                .status(200)
                .send({ message: "Request was confirmed successfully" });
            }
          );
        }
      );
    }
  );
};

exports.ignoreRequest = (req, res) => {
  const { userId: currentUserId } = req;
  const { fromId } = req.params;

  Request.updateOne(
    { to: currentUserId, from: fromId, status: "Pending" },
    { status: "Ignored" },
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Request was ignored successfully" });
    }
  );
};
