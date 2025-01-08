import CommentModel from "@/models/Comment";
import connectToDb from "@/configs/db";
import { authAdmin } from "@/utils/isLogin";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("This Api is protected");
    }

    const { id, body } = await req.json();

    await connectToDb();
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { $push: { answers: { body, createdAt: new Date() } } },
      { new: true }
    );

    if (!updatedComment) {
      return new Response(JSON.stringify({ message: "کامنت پیدا نشد" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedComment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "خطا در ثبت پاسخ", error }), {
      status: 500,
    });
  }
}
