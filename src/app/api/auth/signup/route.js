import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import {
  hashPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth/auth";
import { rolls } from "@/utils/constants";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();

    const { name, phone, email, password } = body;

    //Validation
    if (!name.trim() || !phone.trim() || !password.trim()) {
      return Response.json({ message: "Data is not valid" }, { status: 422 });
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json({ message: "Phone is not valid" }, { status: 422 });
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return Response.json({ message: "Email is not valid" }, { status: 422 });
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return Response.json(
        { message: "Password is not valid" },
        { status: 422 }
      );
    }

    //1-isUser Exist
    //2-Hash Password
    //3-Generation Token
    //4-Create

    // Check if user already exists
    const isUserExist = await UserModel.findOne({
      $or: [{ name }, { phone }],
    }).lean();

    if (isUserExist) {
      return Response.json(
        { message: "This userName Or email or Phone already exist " },
        { status: 409 }
      );
    }
    if (email) {
      const isEmailExist = await UserModel.findOne({ email }).lean();
      if (isEmailExist) {
        return Response.json(
          { message: "This email already exists" },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);


    // Create user
    //first user is admin
    const users = await UserModel.find({}).lean();

    const newUser =  await UserModel.create({
      name,
      phone,
      email: email ? email : `${phone}@gmail.com`,
      password: hashedPassword,
      role: users.length > 0 ? rolls.USER : rolls.ADMIN,
    });

    return Response.json(
      { message: "User registered successfully", user: newUser },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return Response.json(
      { message: "Unknown Internal Server Error" },
      { status: 500 }
    );
  }
}
