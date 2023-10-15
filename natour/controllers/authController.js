const User = require("../models/userModel");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
var jwt = require("jsonwebtoken");

const signTokens = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    passwordChangesAt: req.body.passwordChangesAt,
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: req.body.passwordResetExpires,
  });

  const token = signTokens(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const err = new AppError("Please provide a valid email and password", 400);

  if (!email || !password) {
    return next(err);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(err);
  }

  const token = signTokens(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const err = new AppError("Please login to view", 401);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(err);

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decode.id);
  if (!freshUser || freshUser.changedPasswordAfter(decode.iat))
    return next(err);

  req.user = freshUser;
  next();
});

exports.restrictTo = (...role) => {
  return catchAsync(async (req, res, next) => {
    const err = new AppError(
      "You don't have authorization to preform this action",
      403
    );

    if (!role.includes(req.user.role)) return next(err);

    next();
  });
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  const err = new AppError("There is no user with this email", 404);
  if (!user) return next(err);

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  next();
});
