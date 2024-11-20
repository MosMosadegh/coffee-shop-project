const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true, // حذف فضاهای خالی
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      // match: /^(?:.+\@.+\..+)$/ //email
      // match: /^(?:.+\@.+\..+|[]|[0-9a-fA-F]{24})$/ //email+objectId mongoos
      match:
       /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|)$/g //email+uuidv4+null;
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 8,
    },
    role: {
      type: String,
      default: "USER",
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
