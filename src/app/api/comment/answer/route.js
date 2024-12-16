import CommentModel from '@/models/Comment'; 
import connectToDb from "@/configs/db";

export async function POST(req) {
  const { id, body } = await req.json();

  try {
    await connectToDb();
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { $push: { answers: { body, createdAt: new Date() } } }, 
      { new: true }
    );

    if (!updatedComment) {
      return new Response(JSON.stringify({ message: 'کامنت پیدا نشد' }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedComment), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'خطا در ثبت پاسخ', error }), { status: 500 });
  }
}