const mongoose = require("mongoose");
const axios = require('axios');

const StatusSchema = require("../models/status");
const Status = mongoose.model("Status", StatusSchema.Schema);

function fetchClientData(clientIP, cb) {
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
      })
      instance.save((err, s) => {
        if (err) console.error(err);
      });
      return cb(instance);
    })
    .catch(e => {
      console.error(e);
    });
}

function getClient(clientIP, cb) {
  Status.findOne({ ip: clientIP }, (err, client) => {
    if (client) {
      return cb(client);
    }

    return fetchClientData(clientIP, client => {
      return cb(client);
    });
  });
}

exports.getStatus = (req, res, next) => {
  const clientIP = !req.headers.hasOwnProperty("x-forwarded-for")
    ? req.connection.remoteAddress
    : req.headers["x-forwarded-for"];

  getClient(clientIP, client => {
    res.render("status", { client });
  });
};
