const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConfig");
// not fount path
const notFound = require("./config/notFound.js");
// Router path
const userRouter = require("./modules/user/user.router.js");
const errorHandler = require("./middleware/errorHandler.js");

// init app

const app = express();

// third party middleware

app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ inflate: true, limit: "100kb", type: "text/xml" }));
app.use(bodyParser.raw({ type: "application/json" }));

// router section

app.use("/api/v1/auth", userRouter);

// not found
app.use("*", notFound);
// error handler
app.use(errorHandler);

module.exports = app;
