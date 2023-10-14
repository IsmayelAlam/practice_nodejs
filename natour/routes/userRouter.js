const express = require("express");
const {
  getAllUsers,
  addNewUsers,
  getUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userControllers");
const { signup } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);

router.route("/").get(getAllUsers).post(addNewUsers);
router.route("/:id").get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router;
