const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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
    return res.status(401).render("errors", {
      errors: ["You are not authorized to make this request!"]
    });
  }
  next();
});

app.get("/status", statusesController.getStatus);

app.listen(process.env.LISTEN_PORT);
