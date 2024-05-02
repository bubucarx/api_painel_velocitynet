const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardPLans = mongoose.model("card_plans", {
  nome: String,
  image: String,
  idPlans: {
    type: Schema.Types.ObjectId,
    ref: "plans",
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  tipoPlano: {
    type: String,
    default: null,
  },
  preco: Schema.Types.Decimal128,
});

module.exports = CardPLans;
