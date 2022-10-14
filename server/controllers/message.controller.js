const db = require("../models");
const Message = db.message;

exports.createMessage = async (req, res) => {
  const { userId: sender } = req;
  console.log(req.body)
  const { conversationId, text } = req.body;
  const newMessage = new Message({
    conversationId,
    sender,
    text,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
