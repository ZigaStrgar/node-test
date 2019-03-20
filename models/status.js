const mongoose = require("mongoose");

exports.Schema = mongoose.Schema({
  ip: String,
  country: String,
  geo: {
      lat: Number,
      lng: Number,
  }
});
