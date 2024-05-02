const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  visualizacao: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = CategoryPlan;
