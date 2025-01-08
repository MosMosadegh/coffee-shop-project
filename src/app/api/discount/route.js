import connectToDb from "@/configs/db";
import DiscountModel from "@/models/Discount";
import { authAdmin } from "@/utils/isLogin";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin()
    if(!isAdmin){
      throw new Error("This Api is protected")
    }
    console.log('isAdmin=>', isAdmin)
    await connectToDb();
    const body = await req.json();

    const { code, percent, maxUse, product, isGlobal } = body;

    //validate 

    await DiscountModel.create({ code, percent, maxUse, product, isGlobal, user: isAdmin._id,  });

    return Response.json(
      { message: "Discount code created successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
