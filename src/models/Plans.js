const mongoose = require("mongoose");

const Plans = mongoose.model("plans", {
  name: String,
});

module.exports = Plans;
