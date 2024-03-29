const db = require("../models");
const User = db.user;

exports.updateUser = (req, res) => {
  const { userId: currentUserId, file } = req;
  const { name, surname } = req.body;
  const data = {};
  if (name) data.name = name;
  if (surname) data.surname = surname;
  if (file) data.profilePhotoURL = file.path;
  User.findOneAndUpdate({ _id: currentUserId }, data, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      doc: {
        ...doc,
        ...data,
        profilePhotoURL: file
          ? data.profilePhotoURL?.replace("public", "")
          : doc.profilePhotoURL?.replace("public", ""),
      },
      message: "Successfully updated",
    });
  });
};

exports.getAllUsers = (req, res) => {
  User.find({}, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(doc);
  });
};

exports.getByUsername = (req, res) => {
  const { username } = req.params;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      res.status(404).send({ message: "User not found." });
      return;
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      surname: user.surname,
      name: user.name,
      email: user.email,
      friendsCount: user.friends.length,
      profilePhotoURL: user.profilePhotoURL?.replace("public", "") ?? null,
    });
  });
};

exports.getFriends = (req, res) => {
  const { userId: currentUserId } = req;
  User.findOne({ _id: currentUserId }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find({ _id: { $in: user.friends } }, (err, friends) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(
        friends.map((user) => ({
          id: user._id,
          username: user.username,
          surname: user.surname,
          name: user.name,
          email: user.email,
          profilePhotoURL: user.profilePhotoURL?.replace("public", "") ?? null,
        }))
      );
    });
  });
};

exports.deleteFromFriends = (req, res) => {
  const { friendId } = req.params;
  const { userId: currentUserId } = req;
  User.updateOne(
    { _id: currentUserId },
    {
      $pullAll: {
        friends: [
          {
            _id: friendId,
          },
        ],
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      User.updateOne(
        { _id: friendId },
        {
          $pullAll: {
            friends: [
              {
                _id: currentUserId,
              },
            ],
          },
        },
        (err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res
            .status(200)
            .send({ message: "Successfully removed from friends" });
        }
      );
    }
  );
};
