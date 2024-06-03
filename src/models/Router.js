const mongoose = require("mongoose");

const Router = mongoose.model("router", {
  preco: mongoose.Types.Decimal128,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Router;
