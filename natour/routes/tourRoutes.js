const express = require("express");
const {
  getAllTours,
  addNewTour,
  getTour,
  updateTour,
  deleteTour,
} = require("./../controllers/tourControllers");

const router = express.Router();

router.route("/").get(getAllTours).post(addNewTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
