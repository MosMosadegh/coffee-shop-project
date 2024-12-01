const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
      default: "null"
    },
    date: {
      type: Date, 
      default: Date.now, 
      immutable: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;
