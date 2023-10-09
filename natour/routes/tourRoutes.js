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

const router = express.Router();

// aggregate
router.route("/tour-stats").get(getTourStats);
router.route("/tour-monthly-plans/:year").get(getMonthlyPlans);

// public
router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
