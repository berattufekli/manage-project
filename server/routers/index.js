const express = require("express");
const route = express.Router();

const application_db = require("./../models/application");

const fundamentalRouter = require("./fundamentalRouter");
const fundamentalRouterWithMulter = require("./fundamentalRouterWithMulter");

route.use("/projects", fundamentalRouterWithMulter(application_db.projects));


module.exports = route;