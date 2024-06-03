const mongoose = require("mongoose");
const { Schema } = mongoose;

const Additional = mongoose.model("additional", {
  nome: String,
  image: String,
  preco: Schema.Types.Decimal128,
  idPlan: {
    ref: "plans",
    type: Schema.Types.ObjectId,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Additional;
