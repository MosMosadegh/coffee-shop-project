import connectToDb from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/isLogin";
import validateUser from "@/validations/user";



export async function POST(req) {
  try {
    await connectToDb();
    const user = await authUser();
    const body = await req.json();

 // validation Zod
 const result = validateUser(body);
 if (!result.success) {
   return res.status(400).send(result.error.errors[0].message);
 }

    const { name, email, phone } = body;

    await UserModel.findOneAndUpdate(
      { _id: user._id },
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


export async function DELETE(req) {
  try {
    await connectToDb();
    const body = await req.json();
    const { id } = body;
    //Validation
    
    await UserModel.findOneAndDelete({ _id: id })
    return Response.json(
      { message: "User Removed successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
  
