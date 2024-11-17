const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState) {
      console.log("Already connected to Db.");
      return true; // یا می‌توانید false بازگردانید
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to Db Successfully :))");
      return true;
    }
  } catch (err) {
    console.error("Error in Db Connection =>", err);
    return false; // یا می‌توانید خطا را پرتاب کنید
  }
};

export default connectToDb;
