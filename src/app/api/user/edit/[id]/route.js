import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { authAdmin } from "@/utils/isLogin";
import validateUser from "@/validations/user";

export async function PUT(req, { params }) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }
    
    await connectToDb();
    const id = params.id;
    const body = await req.json();

    // validation Zod
    const result = validateUser(body);
    if (!result.success) {
      return res.status(400).send(result.error.errors[0].message);
    }

    const { name, email, phone } = body;

    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const { id } = params;

    //Validation

    const user = await UserModel.findOne({ _id: id }).lean();
    return Response.json(
      user,
      { message: "User Find successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
