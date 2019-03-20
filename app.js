const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const StatusSchema = require("./models/status");
const Status = mongoose.model("Status", StatusSchema.Schema);
const statusesController = require('./controllers/statuses')

const app = express();

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/testassignment", {
  useNewUrlParser: true
});

app.use("/", (req, res, next) => {
  if (
    req.headers.authorization !==
    "Bearer bEeNCx9Dw13Agr8oud0XFvTCc8HroulIeOj1oUXW"
  ) {
    res.render("errors", {
      errors: ["You are not authorized to make this request!"]
    });
  }
  next();
});

app.get("/status", statusesController.getStatus);

app.listen(process.env.LISTEN_PORT);
