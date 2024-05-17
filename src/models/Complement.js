const mongoose = require("mongoose");
const { Schema } = mongoose;

const Complement = mongoose.model("complement", {
  nome: String,
  image: String,
  idPlan: {
    type: Schema.Types.ObjectId,
    ref: "plan",
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = Complement;
