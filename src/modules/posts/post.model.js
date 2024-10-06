const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: String,
    file: { type: mongoose.Types.ObjectId, ref: "file" },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    updateBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamp: true,
  }
);

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
