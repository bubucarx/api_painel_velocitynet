const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdditionalInformation = mongoose.model("additional_information", {
  nome: String,
  image: String,
  idPlan: {
    type: Schema.Types.ObjectId,
    ref: "plan",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = AdditionalInformation;
