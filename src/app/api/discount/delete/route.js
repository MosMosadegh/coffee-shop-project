import connectToDb from "@/configs/db";
import DiscountModel from "@/models/Discount";
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
      
      await DiscountModel.findOneAndDelete({ _id: id })
      return Response.json(
        { message: "Discount Removed successfully :))" },
        { status: 200 }
      );
    } catch (err) {
      return Response.json({ message: err }, { status: 500 });
    }
  }
    