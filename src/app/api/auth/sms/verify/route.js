import connectToDb from "@/configs/db";
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";
import {
  // generateAccessToken,
  // generateRefreshToken,
  validatePhone,
} from "@/utils/auth/auth";
import { rolls } from "@/utils/constants";

export async function POST(req) {
  try {
    await connectToDb();
    const regBody = await req.json();

    const { phone, code, name } = regBody;
    const email = `${phone}@gmail.com`;

    //validation phone
    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json({ message: "Phone is not valid" }, { status: 422 });
    }

    const otpEntry = await OtpModel.findOne({ phone });

    if (!otpEntry) {
      return Response.json({ message: "OTP not found" }, { status: 404 });
    }

    const currentTime = Date.now();
    if (otpEntry.isBlocked) {
      if (otpEntry.blockedUntil && currentTime < otpEntry.blockedUntil) {
        return Response.json(
          {
            message:
              "Your account is temporarily blocked due to too many failed attempts. Please try again later.",
          },
          { status: 403 }
        );
      } else {
        // Resetting the blocking status if the block time has expired
        otpEntry.isBlocked = false;
        otpEntry.attempts = 0; //Reset attempt
        otpEntry.blockedUntil = null; // Clear blocked time
      }
    }

    // Check if the OTP code matches
    if (otpEntry.code === code) {
      if (otpEntry.expTime > currentTime) {
        const existingUser = await UserModel.findOne({ phone });
        if (!existingUser) {
          // If user is new, create the user
          //first user is admin
          const users = await UserModel.find({}).lean();

          await UserModel.create({
            name,
            phone,
            email,
            role: users.length > 0 ? rolls.USER : rolls.ADMIN,
          });
        }

        // Mark OTP as used
        otpEntry.isUsed = true;
        await otpEntry.save();

        // Return user data
        const user = await UserModel.findOne({ phone }).lean();
        return Response.json(
          {
            message: "OTP verified successfully",
            user: {
              id: user._id.toString(),
              name: user.name,
              phone: user.phone,
              email: user.email,
              role: user.role,
            },
          },
          {
            status: 200,
          }
        );
      } else {
        return Response.json(
          { message: "Code is expired !!" },
          { status: 410 }
        );
      }
    } else {
      // Invalid OTP code
      otpEntry.attempts += 1;

      // Check number of attempts
      if (otpEntry.attempts >= 3) {
        otpEntry.isBlocked = true;
        otpEntry.blockedUntil = new Date(Date.now() + 15 * 60 * 1000); // Block for 15 minutes
      }

      await otpEntry.save();
      return Response.json(
        { error: "Invalid OTP. Please try again." },
        { status: 409 }
      );
    }
  } catch (error) {
    console.error("Error while finding OTP:", error);
    return Response.json({ message: error }, { status: 500 });
  }
}
