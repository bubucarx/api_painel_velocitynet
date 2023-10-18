const mongoose = require("mongoose");

const CardSectionTitle = mongoose.model("card_section_title", {
  name: String,
});

module.exports = CardSectionTitle;
