import connectToDb from "@/configs/db";
import OtpModel from "@/models/Otp";
const request = require("request");
import UserModel from "@/models/User";
import { generateAccessToken, validatePhone } from "@/utils/auth";
import { rolls } from "@/utils/constants";

export async function POST(req) {
  try {
    await connectToDb();
    const regBody = await req.json();

    const { phone, code } = regBody;
    const email = `${phone}@gmail.com`;

    //validation must todo
    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json({ message: "Phone is not valid" }, { status: 422 });
    }

    const otp = await OtpModel.findOne({ phone, code });

    if (!otp) {
      otp.times += 1;
      await otp.save();
      return Response.json({ message: "Code is not correct" }, { status: 409 });
    } else {
      if (otp.times >= 3) {
        return Response.json({ message: "You try over" }, { status: 403 });
      }
      const date = new Date();
      const now = date.getTime();
      if (otp.expTime > now) {
        const accessToken = generateAccessToken({ email });

        //first user is admin
        const users = await UserModel.find({}).lean();

        await UserModel.create({
          phone,
          email,
          role: users.length > 0 ? rolls.USER : rolls.ADMIN,
        });

        return Response.json(
          { message: "Code is correct" },
          {
            status: 200,
            headers: {
              "Set-Cookie": `token=${accessToken};path=/; httpOnly=true`,
            },
          }
        );
      } else {
        return Response.json({ message: "Code is Expired" }, { status: 410 });
      }
    }
  } catch (error) {
    console.error("Error while finding OTP:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
