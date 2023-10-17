const express = require("express");
const {
  getUser,
  getAllUsers,
  updateUsers,
  deleteUsers,
  getMe,
  updateMe,
  deleteMe,
} = require("../controllers/userControllers");
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  protect,
  updatePassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgetPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/update-my-password", updatePassword);
router.patch("/update-me", updateMe);
router.delete("/delete-me", deleteMe);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUsers).delete(deleteUsers);

module.exports = router;
