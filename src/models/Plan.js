const mongoose = require("mongoose");
const { Schema } = mongoose;

const Plan = mongoose.model("plan", {
  nome: String,
  imagem: String,
  planoBase: String,
  descricao: String,
  idCategoria: {
    type: Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  preco: Schema.Types.Decimal128,
  complementar: Schema.Types.Array,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Plan;
