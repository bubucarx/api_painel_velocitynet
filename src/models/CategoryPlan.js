const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryPlan = mongoose.model("category_plan", {
  nome: String,
  preco: Schema.Types.Decimal128,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = CategoryPlan;
