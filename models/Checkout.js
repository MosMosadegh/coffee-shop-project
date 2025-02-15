const mongoose = require("mongoose");
require("./Product");


const schema = new mongoose.Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    authority: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Checkout || mongoose.model("Checkout", schema);

export default model;
