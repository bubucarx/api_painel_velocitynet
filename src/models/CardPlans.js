const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardPLans = mongoose.model("card_pLans", {
  name: String,
  idPlans: {
    type: Schema.Types.ObjectId,
    ref: "plans",
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = CardPLans;
