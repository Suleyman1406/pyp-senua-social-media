const db = require("../models");
const Post = db.post;

exports.getPosts = (req, res) => {
  Post.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(result);
  });
};

exports.addPost = (req, res) => {
  const { userId: currentUserId } = req;
  const { description, imgUrl } = req.body;
  const post = new Post({
    description,
    imgUrl,
  });
};
