const User = require("../models/userModel");

function filterObj(obj, ...allowed) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

exports.getAllUsers = (req, res) => {};
exports.addNewUsers = (req, res) => {};
exports.getUsers = (req, res) => {};
exports.updateUsers = (req, res) => {};

exports.updateMe = catchAsync(async (req, res, next) => {
  const err = new AppError("Password is not valid for this route", 400);

  if (req.body.password || req.body.passwordConfirm) return next(err);

  const filterBody = filterObj(req.body, "name", "email");
  const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteUsers = (req, res) => {};
