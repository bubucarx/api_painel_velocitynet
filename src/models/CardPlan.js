const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardPlan = mongoose.model("card_plan", {
  imagem: String,
  idCategory: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  status: {
    default: true,
    type: Boolean,
  },
});

module.exports = CardPlan;
