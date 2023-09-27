const express = require("express");
const {
  getAllUsers,
  addNewUsers,
  getUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").get(getAllUsers).post(addNewUsers);
router.route("/:id").get(getUsers).patch(updateUsers).delete(deleteUsers);

module.exports = router;
