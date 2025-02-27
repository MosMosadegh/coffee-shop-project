import { getCookie, setCookie } from "cookies-next";
import { verifyAccessToken } from "./auth";

const refreshAccessToken = async () => {
  const refreshToken = getCookie("refreshToken");

  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const { accessToken } = await response.json();

    // ذخیره accessToken جدید در کوکی
    setCookie("accessToken", accessToken, {
      maxAge: 15 * 60, // 15 دقیقه
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return accessToken;
  } else {
    console.error("Failed to refresh access token");
    return null;
  }
};



const fetchProtectedData = async () => {
  let accessToken = getCookie("accessToken");

  // بررسی اعتبار accessToken
  const isTokenValid = await verifyAccessToken(accessToken);
  if (!isTokenValid) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.error("Unable to refresh access token");
      return;
    }
  }

  const response = await fetch("/api/protected", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.error("Failed to fetch data");
  }
};