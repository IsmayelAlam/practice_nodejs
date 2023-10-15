const express = require("express");
const {
  getAllUsers,
  addNewUsers,
  getUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userControllers");
const {
  signup,
  login,
  forgetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgetPassword);
router.post("/reset-password", login);

router.route("/").get(getAllUsers).post(addNewUsers);
router.route("/:id").get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router;
