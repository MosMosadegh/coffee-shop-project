import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyAccessToken } from "@/utils/auth";
import connectToDb from "@/configs/db";
import UserModel from "@/models/User";

export async function GET(req) {
  await connectToDb();

  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const tokenPayload = verifyAccessToken(token);
    if (tokenPayload) {
      const user = await UserModel.findOne({ email: tokenPayload.email });
      return NextResponse.json({ isAuthenticated: user });
    }
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
