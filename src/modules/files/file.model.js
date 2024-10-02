const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  key: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const File = mongoose.model("file", fileSchema);

module.exports = File;
