const db = require("../models");
const Conversation = db.conversation;

exports.createConversation = async (req, res) => {
  const { userId: currentUserId } = req;

  try {
    const conversation = await Conversation.findOne({
      members: { $in: [currentUserId, req.body.receiverId] },
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
    const conversation = await Conversation.find({
      members: { $in: [currentUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversationByTwoUserId = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
