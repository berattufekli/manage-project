const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const application_db = require("./models/application");

dotenv.config({
  path: "./config/config.env",
});

const PORT = process.env.PORT || 8080;

const route = require("./routers");
app.use("/api", route);

app.use(
  "/*",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    // target: "http://68.183.110.77/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(PORT, async () => {
  // application_db.sequelize.sync({ force: true })
  // application_db.sequelize.sync()
});