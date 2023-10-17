const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { deleteOne, updateOne, getOne, getAll } = require("./handlerFactory");

exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.updateUsers = updateOne(User);
exports.deleteUsers = deleteOne(User);

function filterObj(obj, ...allowed) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

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
