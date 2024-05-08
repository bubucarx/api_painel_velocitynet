const mongoose = require("mongoose");

const BuildPlan = mongoose.model("build_plan", {
  nome: String,
  subtitle: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Plans;
