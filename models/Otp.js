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
      required: true
    },
    deviceInfo: {
      type: String,
      required: true
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

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
