import connectToDb from "@/configs/db";
import CommentModel from "@/models/Comment";

export async function PUT(req) {
  try {
    await connectToDb();

    const body = await req.json();

    const { id } = body;

    await CommentModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );

    return Response.json(
      { message: "Comment Accepted successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
