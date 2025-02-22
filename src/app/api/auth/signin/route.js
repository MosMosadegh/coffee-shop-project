import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  validatePhone,
  verifyPassword,
} from "@/utils/auth";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const { email, phone, password } = body;

    //Validation
    const isValidEmail = email ? validateEmail(email) : true;
    const isValidPhone = phone ? validatePhone(phone) : true;
    const isValidPassword = password ? validatePassword(password) : true;

    if (!isValidEmail && !isValidPhone) {
      return Response.json(
        { message: "Email or Phone is invalid" },
        { status: 419 }
      );
    }

    //1-isUser Exist
    //3-Generation Token
    //4-login

    let user;
    if (email) {
      user = await UserModel.findOne({ email }).lean();
    }

    if (!user && phone) {
      user = await UserModel.findOne({ phone }).lean();
    }

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 422 });
    }

    // check This user registered with OTP
    if (!user.password) {
      return Response.json(
        { message: "This user registered with OTP. Please log in using OTP." },
        { status: 403 }
      );
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );
    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "userName or password is not correct !!" },
        { status: 401 }
      );
    }

    const payload = phone ? { phone: user.phone } : { email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await UserModel.findOneAndUpdate(payload, {
      $set: {
        refreshToken,
      },
    }).lean();

    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken}; path=/; httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken}; path=/; httpOnly=true`
    );

    return Response.json(
      { message: "User Logged In successfully" },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    //console.log("Error", error);
    return Response.json({ message: "Error Login User" }, { status: 500 });
  }
}
