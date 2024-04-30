const mongoose = require("mongoose");

const Plans = mongoose.model("plans", {
  name: String,
  subtitle: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Plans;
