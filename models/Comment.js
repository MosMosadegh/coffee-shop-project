

const mongoose = require("mongoose");
require("./Product");
require("./User");

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
    score: {
      type: Number,
      default: 5,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date, // تغییر نوع به Date
      default: Date.now, // بدون تابع
      immutable: false,
    },
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
