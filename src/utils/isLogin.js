import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDb from "@/configs/db";
import { verifyAccessToken } from "./auth";
// import { NextResponse } from "next/server";

// Helper functions
const getRefreshToken = () => {
  return cookies().get("refresh-token")?.value;
};

const validateToken = async (token) => {
  try {
    let tokenPayload = await verifyAccessToken(token.value);
    const refreshToken = getRefreshToken();

    if (!tokenPayload) {
      console.log("🚀 ~ Access token is invalid or expired. Attempting to refresh...");

      if (!refreshToken) {
        console.log("🚀 ~ No refresh token found. Redirecting to login.");
        throw new Error("No refresh token found");
      }

      const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        console.error("Failed to refresh token:", res.statusText);
        throw new Error("Failed to refresh token");
      }

      const data = await res.json();
      const newAccessToken = data.newAccessToken;
      console.log("🚀 ~ New access token:", newAccessToken);

      tokenPayload = verifyAccessToken(newAccessToken);
    }

    return tokenPayload;
  } catch (error) {
    console.error("Error in validateToken:", error);
    throw error;
  }
};

const findUserByTokenPayload = async (tokenPayload) => {
  try {
    if (tokenPayload.email) {
      return await UserModel.findOne({ email: tokenPayload.email });
    } else if (tokenPayload.phone) {
      return await UserModel.findOne({ phone: tokenPayload.phone });
    }
    return null;
  } catch (error) {
    console.error("Error in findUserByTokenPayload:", error);
    throw error;
  }
};

//  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

// Main function
const authUser = async (role = null) => {
  try {
    await connectToDb();
    const token = cookies().get("token");
    const refreshToken = getRefreshToken();

    if (!token && !refreshToken) {
      console.log("🚀 ~ No access token or refresh token found. Redirecting to login.");
      // return NextResponse.redirect(`${baseUrl}/login-register`)
    }

    let tokenPayload;
    if (token) {
      tokenPayload = await validateToken(token);
    } else {
      console.log("🚀 ~ Access token not found, trying to validate refresh token...");
      tokenPayload = await validateToken({ value: refreshToken });
    }

    if (!tokenPayload) {
      return null;
    }

    const user = await findUserByTokenPayload(tokenPayload);

    if (role && user.role !== role) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in authUser:", error);
    // return NextResponse.redirect(`${baseUrl}/login-register`)
  }
};

const authAdmin = async () => {
  return authUser("ADMIN");
};

export { authUser, authAdmin };