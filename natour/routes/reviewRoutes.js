const express = require("express");
const {
  getAllReviews,
  createReviews,
  deleteReview,
  updateReview,
  setTourUserId,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), setTourUserId, createReviews);

router.route("/id").delete(protect, deleteReview).patch(protect, updateReview);

module.exports = router;
