const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const StatusSchema = require("./models/status");
const Status = mongoose.model("Status", StatusSchema.Schema);

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/testassignment", {
  useNewUrlParser: true
});

app.get("/status", (req, res, next) => {
  /*if (
    req.headers.authorization !==
    "Bearer bEeNCx9Dw13Agr8oud0XFvTCc8HroulIeOj1oUXW"
  ) {
    return res.send("You are not authorized to make this request!");
  }*/

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
            location: {
                zip: data.zip,
                city: data.city,
                region: data.region_name,
                country: data.country_name,
                flag: data.location.country_flag,
                geo: {
                    lat: data.latitude,
                    lng: data.longitude
                }
            }
          });
          instance.save(err => {
            if (err) console.error(err);
          });
          res.render('status', {client: instance});
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      res.render('status', {client: docs});
    }
  });
});

app.listen(process.env.LISTEN_PORT);
