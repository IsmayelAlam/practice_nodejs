const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlans,
} = require("./../controllers/tourControllers");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

// aggregate
router.route("/tour-stats").get(getTourStats);
router.route("/tour-monthly-plans/:year").get(getMonthlyPlans);

// public
router.route("/").get(protect, getAllTours).post(createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = router;
