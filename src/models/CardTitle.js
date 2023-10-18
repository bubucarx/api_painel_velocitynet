const mongoose = require("mongoose");

const CardTitle = mongoose.model("card_title", {
  name: String,
});

module.exports = CardTitle;
