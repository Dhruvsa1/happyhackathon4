const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
});

const messagesSchema = new Schema({
  messages: [messageSchema],
});

module.exports = mongoose.model("Messages", messagesSchema, "messages");
