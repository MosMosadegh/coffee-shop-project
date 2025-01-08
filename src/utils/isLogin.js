import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDb from "@/configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  await connectToDb();
  const token = cookies().get("token");
  console.log("🚀 ~ authUser ~ token:", token);
  const refreshToken = cookies().get("refresh-token")?.value;
  console.log("🚀 ~ authUser ~ refreshToken:", refreshToken);
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      // توکن معتبر است
      user =
        (await UserModel.findOne({ email: tokenPayload.email })) ||
        (await UserModel.findOne({ phone: tokenPayload.phone }));
    } else if (!tokenPayload) {
      console.log("🚀 ~ authUser ~ Access token is invalid or expired. Attempting to refresh...");
      console.log("🚀 ~ authUser ~ token2:", token);
      console.log("🚀 ~ authUser ~ refreshToken2:", refreshToken);
      
      const res = await fetch("http://localhost:3000/api/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
      console.log("🚀 ~ authUser ~ res:", res)

      if (res.ok) {
        const data = await res.json();
        const newAccessToken = data.newAccessToken;
        console.log("🚀 ~ authUser ~ newAccessToken:", newAccessToken)

        const newTokenPayload = verifyAccessToken(newAccessToken);
        if (newTokenPayload) {
          user =
            (await UserModel.findOne({ email: newTokenPayload.email })) ||
            (await UserModel.findOne({ phone: newTokenPayload.phone }));
        }
      } else {
        console.error("Failed to refresh token:", res.statusText);
      }
    }
  } else {
    console.log("🚀 ~ authUser ~ No token found.");
    return null;
  }

  return user;
};

const authAdmin = async () => {
  try {
    await connectToDb();

    const token = cookies().get("token");

    if (!token) {
      return null;
    }

    const tokenPayload = verifyAccessToken(token.value);
    if (!tokenPayload) {
      return null;
    }

    let user;
    if (tokenPayload.email) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    } else if (tokenPayload.phone) {
      user = await UserModel.findOne({ phone: tokenPayload.phone });
    }

    if (user && user.role === "ADMIN") {
      return user;
    }

    return null;
  } catch (error) {
    console.error("Error in authAdmin:", error);
    return null;
  }
};

export { authUser, authAdmin };
