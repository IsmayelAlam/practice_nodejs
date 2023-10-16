const express = require("express");
const {
  getAllUsers,
  addNewUsers,
  getUsers,
  updateUsers,
  deleteUsers,
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

router.patch("/update-my-password", protect, updatePassword);
router.patch("/update-me", protect, updateMe);
router.patch("/delete-me", protect, deleteMe);

router.route("/").get(getAllUsers).post(addNewUsers);
router.route("/:id").get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router;
