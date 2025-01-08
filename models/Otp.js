const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true,
    },
    expTime: {
      type: Number,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false
    },
    ipAddress: {
      type: String,
      default: null
    },
    c: {
      type: String,
      default: null
    },
    attempts: {
      type: Number,
      default: 0
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    blockedUntil: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Otp || mongoose.model("Otp", schema);

export default model;
