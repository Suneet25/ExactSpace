let mongoose = require("mongoose");

let ChatSchema = new mongoose.Schema(
  {
    user: { type: String },
    time: { type: String },
    text: { type: String },
    likes: { type: Number },
  },
  { timestamps: true }
);

let ChatModel = mongoose.model("chat", ChatSchema);

module.exports = { ChatModel };
