import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/isLogin";


export async function PUT(req) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }
    
    await connectToDb();
    
    const {id, body} = await req.json();

    // validation Zod

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          body
        },
      }
    );

    return Response.json(
      { message: "Comment updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}


