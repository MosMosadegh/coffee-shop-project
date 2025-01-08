import connectToDb from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "@/utils/auth";

export async function POST(req) {
  console.log("🚀 ~ POST ~ Refresh token endpoint hit")
  try {
    await connectToDb();
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body)
    const { refreshToken } = body;
    // const refreshToken = cookies().get("refresh-token")?.value;

    if (!refreshToken) {
      return Response.json({ message: "No refresh token" }, { status: 401 });
    }

    const user = await UserModel.findOne({ refreshToken });
    console.log("POST ~ user", user);
    if (!user) {
      console.log("🚀 ~ POST ~ no have refresh Token");
      return Response.json(
        { message: "no have refresh Token" },
        { status: 401 }
      );
    }

    try {
      verify(refreshToken, process.env.RefreshTokenSecretKey);
    } catch (err) {
      return Response.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const payload = user.phone ? { phone: user.phone } : { email: user.email };
    const newAccessToken = generateAccessToken(payload);

    return Response.json(
      { message: "New Access Token Generated Successfully ", newAccessToken },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken}; path=/; httpOnly=true; secure;samesite=strict`,
        },
      }
    );
  } catch (error) {
    console.log("Error", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
