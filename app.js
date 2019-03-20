const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/testassignment", {useNewUrlParser: true});

app.get("/status", (req, res, next) => {
    res.send(req.connection.remoteAddress)
});

app.listen(3000);
