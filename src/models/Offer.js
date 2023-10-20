const mongoose = require("mongoose");

const Offer = mongoose.model("offer", {
  title: String,
  description: String,
  value: String,
  image: String,
});

module.exports = Offer;
