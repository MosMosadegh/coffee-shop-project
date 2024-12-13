import connectToDb from "@/configs/db";
import BanModel from "@/models/Ban";

export async function POST(req) {
  try {
    await connectToDb();

    const body = await req.json();

    const { email, phone } = body;

    //validate (email or phone =! null)

    await BanModel.create({ email, phone });

    return Response.json(
      { message: "User Ban successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
