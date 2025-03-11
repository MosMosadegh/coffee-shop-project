import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth/auth";
import connectToDb from "@/configs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  await connectToDb();

  const session = await getServerSession(authOptions);
  const token = session.accessToken;

  if (!session) {
    return Response.json(
      {
        data: null,
        message: "Not Access !!",
      },
      { status: 401 }
    );
  }

  const tokenPayload = verifyAccessToken(token);

  if (!tokenPayload) {
    return Response.json(
      {
        data: null,
        message: "Invalid Token !!",
      },
      { status: 402 }
    );
  }

  // دسترسی به اطلاعات کاربر از توکن
  const { email, phone } = tokenPayload;

  let user = null;

  if (email) {
    user = await UserModel.findOne({ email });
  } else if (phone) {
    user = await UserModel.findOne({ phone });
  }

  if (!user) {
    return Response.json(
      {
        data: null,
        message: "User not found !!",
      },
      { status: 404 }
    );
  }

  return Response.json(user);
}
