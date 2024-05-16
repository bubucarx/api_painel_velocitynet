const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  logo: String,
  subTitulo: {
    default: null,
    type: String,
  },
  visualizacao: String,
  status: {
    type: Boolean,
    default: true,
  },
  images: {
    type: Schema.Types.Array,
  },
});

module.exports = CategoryPlan;
