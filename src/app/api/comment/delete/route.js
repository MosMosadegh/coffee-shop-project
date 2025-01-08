import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";
import { authAdmin } from "@/utils/isLogin";

export async function DELETE(req) {
    try {
      const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }

      await connectToDb();
      const body = await req.json();
      const { id } = body;
      //Validation
      
      await CommentModel.findOneAndDelete({ _id: id })
      return Response.json(
        { message: "Comment Removed successfully :))" },
        { status: 200 }
      );
    } catch (err) {
      return Response.json({ message: err }, { status: 500 });
    }
  }
    