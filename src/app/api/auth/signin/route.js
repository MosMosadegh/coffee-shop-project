import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDb();
    const body = await req.json();
    const { email, password } = body;

    //Validation
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "Email or Password is invalid" },
        { status: 419 }
      );
    }

    //1-isUser Exist
    //3-Generation Token
    //4-login

    const user = await UserModel.findOne({ email }).lean();

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 422 });
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
    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = generateRefreshToken({ email: user.email });

    await UserModel.findOneAndUpdate({email},{
      $set:{
        refreshToken
      }
    }).lean()

    return Response.json(
      { message: "User Logged In successfully" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${accessToken}; path=/; httpOnly=true`,
        },
      }
    );
  } catch (error) {
    console.log("Error", error);
    return Response.json({ message: "Error Login User" }, { status: 500 });
  }
}
