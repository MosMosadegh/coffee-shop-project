import { NextResponse } from "next/server";
import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "@/utils/auth/auth";

export async function POST(req) {
  console.log("🚀 ~ POST ~ Refresh token endpoint hit")
  try {
    await connectToDb();
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body)
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    const user = await UserModel.findOne({ refreshToken });
    console.log("🚀 ~ POST ~ user:", user)
    if (!user) {
      return NextResponse.json(
        { message: "no have refresh Token" },
        { status: 401 }
      );
    }

    try {
      verify(refreshToken, process.env.RefreshTokenSecretKey);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const payload = user.phone ? { phone: user.phone } : { email: user.email };
    const newAccessToken = generateAccessToken(payload);

    return NextResponse.json(
      { message: "New Access Token Generated Successfully ", newAccessToken },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
