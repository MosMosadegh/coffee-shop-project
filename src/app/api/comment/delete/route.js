import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";

export async function DELETE(req) {
    try {
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
    