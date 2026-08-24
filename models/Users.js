const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Faculty", "Admin"],
      default: "Faculty",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
