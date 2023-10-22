const express = require("express");
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  updateUserData,
  alerts,
} = require("../controllers/viewsController");
const { protect, isLoggedIn } = require("../controllers/authController");

const router = express.Router();

router.use(alerts);

router.get("/", isLoggedIn, getOverview);

router.get("/tour/:slug", isLoggedIn, getTour);
router.get("/login", isLoggedIn, getLoginForm);

router.get("/me", protect, getAccount);

router.get("/my-tours", protect, getMyTours);

router.post("/submit-user-data", protect, updateUserData);

module.exports = router;
