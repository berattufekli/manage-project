const express = require("express");
const route = express.Router();
const authController = require("../../controllers/auth/authController");
const authMiddleware = require("../../middlewares/auth/auth");

route.post(
  "/register",
  authMiddleware.registerControl,
  authController.register,
)

module.exports = route;