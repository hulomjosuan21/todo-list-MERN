const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  userAuth,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

// user routers
router.get("/", getUsers);
router.post("/", addUser);
router.post("/auth", userAuth);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
