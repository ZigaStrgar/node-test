const mongoose = require("mongoose");

exports.Schema = mongoose.Schema({
  ip: String,
  location: {
    zip: String,
    city: String,
    region: String,
    country: String,
    flag: String,
    geo: {
      lat: Number,
      lng: Number
    }
  }
});
