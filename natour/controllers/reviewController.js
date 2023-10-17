const Review = require("../models/reviewModel");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReviews = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);

exports.setTourUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.params.userId;
  next();
};
