const express = require("express");
const route = express.Router();
const authController = require("../../controllers/auth/authController");
const authMiddleware = require("../../middlewares/auth/auth");

route.post(
  "/register",
  authMiddleware.registerControl,
  authController.register,
);

route.post(
  "/login",
  authMiddleware.loginControl,
  authController.login,
)

module.exports = route;