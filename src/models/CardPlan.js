const mongoose = require("mongoose");

const CardPlan = mongoose.model("CardPlan", {
  imagem: String,
  status: {
    default: false,
    type: Boolean,
  },
});

module.exports = CardPlan;
