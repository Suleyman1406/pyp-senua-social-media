const db = require("../models");
const Post = db.post;
const User = db.user;

exports.getPosts = (_, res) => {
  Post.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const userIdList = result.map((res) => res.createdBy);
    User.find({ _id: { $in: userIdList } }, (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(
        result.map((post) => ({
          id: post._id,
          description: post.description,
          createdOn: post.createdOn,
          imgUrl: post.imgUrl,
          likes: post.likes,
          author: {
            id: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            )._id,
            username: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            ).username,
            surname: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            ).surname,
            name: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            ).name,
            email: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            ).email,
            profilePhotoURL: users.find(
              (user) => user._id.toString() === post.createdBy.toString()
            ).profilePhotoURL,
          },
        }))
      );
    });
  });
};

exports.createPost = (req, res) => {
  const { userId: currentUserId, file } = req;
  const { description } = req.body;
  const post = new Post({
    createdBy: currentUserId,
    description,
    imgUrl: file.path,
  });
  post.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Post was created successfully!" });
  });
};

exports.toggleLike = async (req, res) => {
  const { userId: currentUserId } = req;
  const { id } = req.params;

  let result = await Post.updateOne(
    { _id: id },
    {
      $addToSet: {
        likes: {
          _id: currentUserId,
        },
      },
    }
  );

  if (result.nModified === 0) {
    await Post.updateOne(
      { _id: id },
      {
        $unset: {
          likes: { _id: currentUserId },
        },
      }
    );
    res
      .status(200)
      .send({ liked: false, message: "Post was unliked successfully!" });
  } else {
    res
      .status(200)
      .send({ liked: true, message: "Post was liked successfully!" });
  }
};
