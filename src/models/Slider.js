const mongoose = require("mongoose");

const Slider = mongoose.model("slider", {
  name: String,
});

module.exports = Slider;
