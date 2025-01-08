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

    const body = await req.json();

    const { id } = body;

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: false,
        },
      }
    );

    return Response.json(
      { message: "Comment Rejected successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
