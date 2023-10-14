const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user needs name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user needs email"],
    unique: true,
    lowercase: true,
    // validate: [validator.isEmail, "please provide a valid email"],
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "please provide a valid email",
    ],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user needs password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user needs password confirmation"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
