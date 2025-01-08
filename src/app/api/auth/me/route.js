import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";
import connectToDb from "@/configs/db";

export async function GET() {
  await connectToDb();

  const token = cookies().get("token");

  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);

    if (tokenPayload) {
      if (tokenPayload.email) {
        user = await UserModel.findOne({ email: tokenPayload.email });
      } else if (tokenPayload.phone) {
        user = await UserModel.findOne({ phone: tokenPayload.phone });
      }
    } else if (!tokenPayload) {
      return Response.json(
        {
          data: null,
          message: "Not Access !!",
        },
        { status: 401 }
      );
    }

    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "Not Access !!",
      },
      { status: 401 }
    );
  }
}
