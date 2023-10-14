const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    validate: [validator.isEmail, "please provide a valid email"],
    // match: [
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    //   "please provide a valid email",
    // ],
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
    message: "passwords are not same",
    validate: {
      validator: function (el) {
        return this.password === el;
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
