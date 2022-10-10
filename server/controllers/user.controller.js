const db = require("../models");
const User = db.user;

exports.getByUsername = (req, res) => {
  const { username } = req.params;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      surname: user.surname,
      name: user.name,
      email: user.email,
      profilePhotoURL: user.profilePhotoURL,
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
          profilePhotoURL: user.profilePhotoURL,
        }))
      );
    });
  });
};

exports.addToFriends = (req, res) => {
  const { friendId } = req.params;
  const { userId: currentUserId } = req;
  if (friendId === currentUserId) {
    res.status(500).send({ message: "Cannot add yourself as a friend" });
    return;
  }
  User.updateOne(
    { _id: currentUserId },
    {
      $addToSet: {
        friends: {
          _id: friendId,
        },
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Successfully added to friends" });
    }
  );
};

exports.deleteFromFriends = (req, res) => {
  const { friendId } = req.params;
  const { userId: currentUserId } = req;
  User.updateOne(
    { _id: currentUserId },
    {
      $unset: {
        friends: {
          _id: friendId,
        },
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({ message: "Successfully removed from friends" });
    }
  );
};
