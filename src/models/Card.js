const mongoose = require("mongoose");

const Card = mongoose.model("card", {
  name: String,
  description: String,
  logo: String,
  validation: {
    type: Boolean,
    default: true,
  },
});

module.exports = Card;
