import connectToDb from "@/configs/db";
import DiscountModel from "@/models/Discount";
import { authUser } from "@/utils/isLogin";

export async function POST(req) {
  try {
    await connectToDb();
    const user = await authUser();
    const body = await req.json();

    const { code, percent, maxUse, product } = body;

    //validate 

    await DiscountModel.create({ code, percent, maxUse, product, user: user._id, });

    return Response.json(
      { message: "Discount code created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
