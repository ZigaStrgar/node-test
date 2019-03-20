const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const StatusSchema = require("./models/status");
const Status = mongoose.model("Status", StatusSchema.Schema);

const app = express();

mongoose.connect("mongodb://localhost/testassignment", {
  useNewUrlParser: true
});

app.get("/status", (req, res, next) => {
  const clientIP = !req.headers.hasOwnProperty("x-forwarded-for")
    ? req.connection.remoteAddress
    : req.headers["x-forwarded-for"];

  Status.findOne({ ip: clientIP }, (err, docs) => {
    if (!docs) {
      axios
        .get(`${process.env.IP_API_URL}/${clientIP}`, {
          params: {
            access_key: process.env.IP_API_KEY
          }
        })
        .then(({ data }) => {
          const instance = new Status({
            ip: clientIP,
            country: data.country_name,
            geo: { lat: data.latitude, lng: data.longitude }
          });
          instance.save(err => {
            if (err) console.error(err);
          });
          res.send(instance.country + " - Loaded from the API provider");
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      res.send(docs.country + " - Loaded from the database");
    }
  });
});

app.listen(3000);
