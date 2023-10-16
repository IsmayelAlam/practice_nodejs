const express = require("express");
const {
  getAllReviews,
  createReviews,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), createReviews);

module.exports = router;
