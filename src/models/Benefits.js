const mongoose = require("mongoose");
const { Schema } = mongoose;

const Benefits = mongoose.model("benefits", {
  npme: String,
  image: String,
  preco: Schema.Types.Decimal128,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Benefits;
