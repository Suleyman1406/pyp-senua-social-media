const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Pending",
    },
  })
);

module.exports = Request;
