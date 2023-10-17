const express = require("express");
const {
  getAllReviews,
  createReviews,
  deleteReview,
  updateReview,
  setTourUserId,
  getReview,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), setTourUserId, createReviews);

router.use(protect);

router
  .route("/id")
  .get(getReview)
  .delete(restrictTo("user"), deleteReview)
  .patch(restrictTo("user"), updateReview);

module.exports = router;
