const db = require("../models");
const Conversation = db.conversation;

exports.createConversation = async (req, res) => {
  const { userId: currentUserId } = req;

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [currentUserId, req.body.receiverId] },
    });
    if (conversation) {
      res.status(200).json(conversation);
      return;
    }
    const newConversation = new Conversation({
      members: [currentUserId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversation = async (req, res) => {
  const { userId: currentUserId } = req;
  try {
    const conversations = await Conversation.find({
      members: { $in: [currentUserId] },
    })
      .populate(
        "members",
        "_id, name , username , surname , email , profilePhotoURL"
      )
      .exec();

    res.status(200).json(
      conversations.map((c) => ({
        ...c._doc,
        members: c.members.map((m) => ({
          ...m._doc,
          profilePhotoURL: m.profilePhotoURL?.replace("public", "") ?? null,
        })),
      }))
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversationByTwoUserId = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })

      .populate(
        "members",
        "_id, name , username , surname , email , profilePhotoURL"
      )
      .exec();
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
