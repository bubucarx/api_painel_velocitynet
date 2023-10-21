const mongoose = require("mongoose");

const Tv = mongoose.model("tv", {
  title: String,
  description: String,
  value: String,
  image: String,
});

module.exports = Tv;
