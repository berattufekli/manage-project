const express = require("express");
const route = express.Router();

const application_db = require("./../models/application");

const fundamentalRouter = require("./fundamentalRouter");
const fundamentalRouterWithMulter = require("./fundamentalRouterWithMulter");

const authRoute = require("./auth/auth");

route.use("/auth", authRoute);
route.use("/projects", fundamentalRouterWithMulter(application_db.projects));


module.exports = route;