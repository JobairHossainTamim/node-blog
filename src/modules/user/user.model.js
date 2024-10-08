const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true },
    //   role=1 --->Admin 2>----Normal Admin 3>----user
    role: { type: Number, default: 3 },
    verificationCode: String,
    forgetPasswordCode: String,
    isVerified: { type: Boolean, default: false },
    profilePic: { type: mongoose.Types.ObjectId, ref: "file" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
