import { parse } from "cookie";
import connectToDb from "@/configs/db";
import model from "@/models/User";
import { verifyAccessToken } from "./auth";

export const isAuthenticated = async (req) => {
  await connectToDb();
  const cookies = parse(req ? req.headers.cookie || "" : document.cookie);
  const token = cookies.token;

  if (!token) {
    return false; // اگر توکن وجود ندارد، کاربر وارد نشده است
  }

  try {
    const tokenPayload = verifyAccessToken(token); // استفاده از token به جای token.value
    if (tokenPayload) {
      const user = await model.findOne({ email: tokenPayload.email });
      return user ? true : false; // اگر کاربر پیدا شد، true برگردانید
    }
    return false; // اگر payload معتبر نبود
  } catch (error) {
    console.error("Invalid token:", error);
    return false; // اگر توکن نامعتبر باشد، کاربر وارد نشده است
  }
};
