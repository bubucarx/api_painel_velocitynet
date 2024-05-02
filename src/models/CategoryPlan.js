const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  subTitulo: {
    default: null,
    type: String,
  },
  visualizacao: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = CategoryPlan;
