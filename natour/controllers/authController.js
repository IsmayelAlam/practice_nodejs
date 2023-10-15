const User = require("../models/userModel");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
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

  const err01 = new AppError("There is no user with this email", 404);
  const err02 = new AppError(
    "There was an error sending email, please try again",
    500
  );

  if (!user) return next(err01);

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Submit a Patch request with your new password to: ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token send",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(err02);
  }

  next();
});
