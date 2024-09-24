const mongoose = require("mongoose");

const FileSchema = mongoose.Schema(
  {
    key: { type: String, required: true },
    size: Number,
    mimeType: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const file = mongoose.model("file", FileSchema);

module.exports = file;
