import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { authAdmin } from "@/utils/isLogin";

export async function PUT(req) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }
    
     await connectToDb();

    const body = await req.json();

    const { id } = body;
    console.log("Body=", body);
    console.log("User ID:", id);

    const user = await UserModel.findOne({ _id: id }).lean();
    console.log("user=", user);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user.role === "USER" ? "ADMIN" : "USER",
        },
      }
    );

    return Response.json(
      { message: "User Role updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
