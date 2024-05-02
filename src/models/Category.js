const mongoose = require("mongoose");

const Category = mongoose.model("category", {
  name: String,
  subtitle: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Category;
