const mongoose = require("mongoose");
require("./Product");
require("./User");

const AnswerSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replies: {
    type: String,
  },
});

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
      type: Date,
      default: Date.now,
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
    answers: [AnswerSchema],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
