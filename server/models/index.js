const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.request = require("./request.model");
db.post = require("./post.model");
db.conversation = require("./conversation.model");
db.message = require("./message.model");

db.ROLES = ["user", "admin"];

module.exports = db;
